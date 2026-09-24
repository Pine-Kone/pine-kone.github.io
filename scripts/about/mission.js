// My Mission page - story grid filters.
// The Area and Time Range dropdowns build themselves from the story cards'
// data-area / data-range attributes, so adding a story is just adding a card.
//   data-area="Neuquén"
//   data-range="2013-early" | "2013-mid" | "2013-late"   (optional)

document.addEventListener("DOMContentLoaded", function () {
  var grid = document.getElementById("story-grid");
  var areaFilter = document.getElementById("filter-area");
  var rangeFilter = document.getElementById("filter-range");
  var emptyMsg = document.getElementById("story-empty");
  var noMatchMsg = document.getElementById("story-no-match");
  if (!grid || !areaFilter || !rangeFilter) return;

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

  // Build dropdown options from the cards on the page.
  var areas = [];
  var ranges = [];
  cards.forEach(function (card) {
    var a = card.dataset.area;
    var r = card.dataset.range;
    if (a && areas.indexOf(a) === -1) areas.push(a);
    if (r && ranges.indexOf(r) === -1) ranges.push(r);
  });
  areas.sort(function (x, y) { return x.localeCompare(y); });
  ranges.sort(function (x, y) { return rangeSortKey(x) - rangeSortKey(y); });

  areas.forEach(function (a) {
    var opt = document.createElement("option");
    opt.value = a;
    opt.textContent = a;
    areaFilter.appendChild(opt);
  });
  ranges.forEach(function (r) {
    var opt = document.createElement("option");
    opt.value = r;
    opt.textContent = rangeLabel(r);
    rangeFilter.appendChild(opt);
  });

  if (emptyMsg) emptyMsg.hidden = cards.length > 0;
  if (cards.length === 0) {
    areaFilter.disabled = true;
    rangeFilter.disabled = true;
  }

  function applyFilters() {
    var area = areaFilter.value;
    var range = rangeFilter.value;
    var shown = 0;
    cards.forEach(function (card) {
      var matchesArea = area === "all" || card.dataset.area === area;
      var matchesRange = range === "all" || card.dataset.range === range;
      var visible = matchesArea && matchesRange;
      card.hidden = !visible;
      if (visible) shown++;
    });
    if (noMatchMsg) noMatchMsg.hidden = !(cards.length > 0 && shown === 0);
  }

  areaFilter.addEventListener("change", applyFilters);
  rangeFilter.addEventListener("change", applyFilters);
  applyFilters();
});
