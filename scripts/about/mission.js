// My Mission page - story grid filters.
// The Mission, Zone, Area and Time Range dropdowns build themselves from the
// story cards' data attributes, so adding a story is just adding a card.
//   data-mission="Neuquén"
//   data-zone="Centro"          (optional - leave off if unknown)
//   data-area="Belgrano"        (optional - leave off if unknown)
//   data-range="2013-early" | "2013-mid" | "2013-late"   (optional)

document.addEventListener("DOMContentLoaded", function () {
  var grid = document.getElementById("story-grid");
  var rangeFilter = document.getElementById("filter-range");
  var emptyMsg = document.getElementById("story-empty");
  var noMatchMsg = document.getElementById("story-no-match");
  if (!grid || !rangeFilter) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll(".story-card"));
  var PART_ORDER = { early: 1, mid: 2, late: 3 };

  function rangeLabel(value) {
    var parts = value.split("-");
    var year = parts[0];
    var part = parts[1];
    if (!part) return year;
    return part.charAt(0).toUpperCase() + part.slice(1) + " " + year;
  }

  function rangeSortKey(value) {
    var parts = value.split("-");
    return Number(parts[0]) * 10 + (PART_ORDER[parts[1]] || 0);
  }

  // Cards with no photo get a placeholder block instead of a broken image.
  cards.forEach(function (card) {
    if (!card.querySelector(".story-thumb")) {
      var ph = document.createElement("div");
      ph.className = "story-thumb-placeholder";
      ph.setAttribute("aria-hidden", "true");
      ph.textContent = "📖";
      card.insertBefore(ph, card.firstChild);
    }
  });

  // Each filter: the <select> plus the card data attribute it reads.
  var filters = [
    { el: document.getElementById("filter-mission"), key: "mission" },
    { el: document.getElementById("filter-zone"), key: "zone" },
    { el: document.getElementById("filter-area"), key: "area" },
    { el: rangeFilter, key: "range", label: rangeLabel, sortKey: rangeSortKey }
  ].filter(function (f) { return f.el; });

  // Build dropdown options from the cards on the page.
  filters.forEach(function (f) {
    var values = [];
    cards.forEach(function (card) {
      var v = card.dataset[f.key];
      if (v && values.indexOf(v) === -1) values.push(v);
    });
    if (f.sortKey) {
      values.sort(function (x, y) { return f.sortKey(x) - f.sortKey(y); });
    } else {
      values.sort(function (x, y) { return x.localeCompare(y); });
    }
    values.forEach(function (v) {
      var opt = document.createElement("option");
      opt.value = v;
      opt.textContent = f.label ? f.label(v) : v;
      f.el.appendChild(opt);
    });
    // Nothing to filter by yet (e.g. no zones recorded) - grey it out.
    f.el.disabled = values.length === 0;
  });

  if (emptyMsg) emptyMsg.hidden = cards.length > 0;

  function applyFilters() {
    var shown = 0;
    cards.forEach(function (card) {
      var visible = filters.every(function (f) {
        return f.el.value === "all" || card.dataset[f.key] === f.el.value;
      });
      card.hidden = !visible;
      if (visible) shown++;
    });
    if (noMatchMsg) noMatchMsg.hidden = !(cards.length > 0 && shown === 0);
  }

  filters.forEach(function (f) {
    f.el.addEventListener("change", applyFilters);
  });
  applyFilters();
});
