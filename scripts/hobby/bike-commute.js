// Bike Commute Tracker - reads /files/bike-commute/rides.json and builds
// every number on the page from it. To log a ride, add one line to the JSON:
//   { "date": "YYYY-MM-DD", "miles": 5.9 }
// (One entry per ride. A round trip can be one entry with the combined
// miles, or two entries on the same date - both work.)

(function () {
  var RIDES_URL = "/files/bike-commute/rides.json";
  var MOON_MILES = 238900;
  var EARTH_CIRCUMFERENCE_MILES = 24901;

  // Straight-line ("as the crow flies") distances from Idaho Falls, in miles.
  // Add, remove, or reorder freely - the page sorts them by distance.
  var LANDMARKS = [
    { name: "Rigby, Idaho", miles: 14 },
    { name: "Rexburg, Idaho (BYU-Idaho)", miles: 26 },
    { name: "Pocatello, Idaho (Idaho State University)", miles: 48 },
    { name: "Old Faithful, Yellowstone", miles: 90 },
    { name: "the Salt Lake Temple", miles: 188 },
    { name: "the Idaho State Capitol in Boise", miles: 209 },
    { name: "Mount Rushmore", miles: 429 },
    { name: "the Las Vegas Strip", miles: 532 },
    { name: "the Space Needle in Seattle", miles: 574 },
    { name: "the Golden Gate Bridge", miles: 672 },
    { name: "Chicago", miles: 1240 },
    { name: "the Statue of Liberty", miles: 1941 },
    { name: "Neuquén, Argentina", miles: 6324 },
    { name: "Comodoro Rivadavia, Argentina", miles: 6750 },
    { name: "all the way around the Earth", miles: EARTH_CIRCUMFERENCE_MILES },
  ];

  function fmtMiles(n) {
    return n.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  }

  // Keeps tiny percentages readable (0.0025% instead of 0.00% or 2.5e-3).
  function fmtPercent(pct) {
    if (pct === 0) return "0%";
    if (pct >= 1) return pct.toLocaleString("en-US", { maximumFractionDigits: 2 }) + "%";
    var decimals = Math.min(10, Math.max(2, Math.ceil(-Math.log10(pct)) + 1));
    return pct.toFixed(decimals) + "%";
  }

  function fmtDate(iso) {
    var p = iso.split("-");
    var d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }

  function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function render(rides) {
    rides = rides
      .filter(function (r) { return r && r.date && !isNaN(Number(r.miles)); })
      .map(function (r) { return { date: String(r.date), miles: Number(r.miles) }; })
      .sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });

    var year = new Date().getFullYear();
    var total = 0;
    var ytd = 0;
    var ytdRides = 0;
    var years = {};
    rides.forEach(function (r) {
      total += r.miles;
      var y = Number(r.date.slice(0, 4));
      years[y] = true;
      if (y === year) {
        ytd += r.miles;
        ytdRides++;
      }
    });
    var multiYear = Object.keys(years).length > 1;

    setText("ytd-label", year + " Miles");
    setText("ytd-miles", fmtMiles(ytd));
    setText("ytd-rides", ytdRides + (ytdRides === 1 ? " ride" : " rides"));
    setText("total-miles", fmtMiles(total));
    setText("total-rides", rides.length + (rides.length === 1 ? " ride" : " rides"));
    setText("last-ride", rides.length ? fmtDate(rides[rides.length - 1].date) : "No rides yet");

    // The all-time tile only matters once the log spans more than one year.
    var totalTile = document.getElementById("total-tile");
    if (totalTile) totalTile.hidden = !multiYear;

    renderLandmarks(total);
    renderMoon(total);
  }

  function renderLandmarks(total) {
    var list = LANDMARKS.slice().sort(function (a, b) { return a.miles - b.miles; });
    var passed = list.filter(function (l) { return total >= l.miles; });
    var next = list.find(function (l) { return total < l.miles; });

    var headline = document.getElementById("landmark-headline");
    if (headline) {
      if (passed.length) {
        var last = passed[passed.length - 1];
        headline.textContent = "I've now biked farther than the distance from Idaho Falls to " + last.name + " (" + fmtMiles(last.miles) + " mi).";
      } else if (next) {
        headline.textContent = "Just getting started - " + fmtMiles(next.miles - total) + " more miles until I've biked the distance from Idaho Falls to " + next.name + ".";
      }
    }

    var nextEl = document.getElementById("next-landmark");
    if (nextEl) {
      if (next) {
        var pct = Math.min(100, (total / next.miles) * 100);
        nextEl.innerHTML =
          '<p class="next-label">Next stop: <strong></strong></p>' +
          '<div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct.toFixed(1) + '"><div class="progress-fill"></div></div>' +
          '<p class="next-detail"></p>';
        nextEl.querySelector("strong").textContent = next.name;
        nextEl.querySelector(".progress-fill").style.width = pct + "%";
        nextEl.querySelector(".next-detail").textContent =
          fmtMiles(total) + " of " + fmtMiles(next.miles) + " mi (" + fmtPercent(pct) + ") - " + fmtMiles(next.miles - total) + " mi to go";
      } else {
        nextEl.innerHTML = '<p class="next-label">Every landmark on the list is done. Time to add some new ones!</p>';
      }
    }

    var ul = document.getElementById("landmark-list");
    if (ul) {
      ul.innerHTML = "";
      list.forEach(function (l) {
        var li = document.createElement("li");
        var done = total >= l.miles;
        li.className = done ? "landmark done" : (l === next ? "landmark next" : "landmark");
        var icon = document.createElement("span");
        icon.className = "landmark-icon";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = done ? "✅" : (l === next ? "🚴" : "⬜");
        var name = document.createElement("span");
        name.className = "landmark-name";
        name.textContent = "Idaho Falls to " + l.name;
        var dist = document.createElement("span");
        dist.className = "landmark-dist";
        dist.textContent = fmtMiles(l.miles) + " mi";
        li.appendChild(icon);
        li.appendChild(name);
        li.appendChild(dist);
        ul.appendChild(li);
      });
    }
  }

  function renderMoon(total) {
    var pct = (total / MOON_MILES) * 100;
    setText("moon-percent", fmtPercent(pct));
    setText("moon-detail", fmtMiles(total) + " of " + MOON_MILES.toLocaleString("en-US") + " miles - " + fmtMiles(Math.max(0, MOON_MILES - total)) + " to go.");
    var fill = document.getElementById("moon-fill");
    // Keep a visible sliver on the bar even when the real percentage is tiny.
    if (fill) fill.style.width = (total > 0 ? Math.max(pct, 0.75) : 0) + "%";
  }

  document.addEventListener("DOMContentLoaded", function () {
    fetch(RIDES_URL, { cache: "no-cache" })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(render)
      .catch(function (err) {
        console.error("Bike commute tracker: couldn't load rides.json", err);
        setText("landmark-headline", "Couldn't load the ride log right now - try refreshing.");
      });
  });
})();
