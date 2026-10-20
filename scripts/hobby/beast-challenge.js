// Haroldsen Beast Challenges - one script for the landing page and every
// challenger page. All numbers come from /files/beast-challenge/<person>.json.
//
// Landing page:    <main data-beast-landing>
// Challenger page: <main data-beast-person="lucy">
//
// A person's JSON is either ONE challenge (its fields sit at the top level,
// like lucy.json) or SEVERAL, listed under "challenges": [ ... ] (like
// hans.json). Each challenge can have an "area" (Spiritual, Social,
// Intellectual, Physical, Personal Management) and an "emoji".
//
// ---------- Challenge types + how to log ----------
// "reading"  - log where you are, not pages read:
//              { "date": "YYYY-MM-DD", "book": 2, "page": 145 }
// "best"     - log the best result of the session (highest one counts):
//              { "date": "YYYY-MM-DD", "value": 3, "note": "after school" }
// "total"    - log each chunk, they add up (hours, dollars, miles):
//              { "date": "YYYY-MM-DD", "value": 1.5 }
// "pullups"  - log your best set of the workout, and which band (if any):
//              { "date": "YYYY-MM-DD", "band": "orange", "reps": 6 }
//              { "date": "YYYY-MM-DD", "band": "none", "reps": 2 }
//              Only "none" (no band) counts toward the main goal. Band ids
//              come from the "bands" list (most help first).
// "time"     - timed runs; log every run, only ones at least "distance"
//              miles count toward the goal:
//              { "date": "YYYY-MM-DD", "miles": 3, "time": "31:42" }
//              "target" is the goal time ("30:00"), "baseline" is optional.
// "chapters" - a reading list of specific chapters ("books": [{ "book": "Job",
//              "chapters": [4, 5, 6] }]). Log what you read:
//              { "date": "YYYY-MM-DD", "read": "Job 4-6" }
//              { "date": "YYYY-MM-DD", "read": ["Psalms 3", "Psalms 9-11"] }
//              A bare book name ("read": "Ezra") counts every listed chapter
//              in it. Chapters not on the list are ignored. "target" is how
//              many listed chapters to read by the deadline.
// "weekly"   - something to do once a week; any entry in a Mon-Sun week
//              counts that week: { "date": "YYYY-MM-DD", "note": "Dinner + movie" }
//              "target" is the number of weeks.
// "counter"  - just counts things up, no goal (Bennett's spills):
//              { "date": "YYYY-MM-DD", "count": 1, "note": "Milk, kitchen table" }
//              ("count" defaults to 1.)
// "planning" - not locked in yet; shows the "ideas" list.
//
// Optional "restDays": [0] on a challenge skips those weekdays (0 = Sunday)
// when working out streaks and the needed-per-day pace.
//
// ---------- Milestones ----------
// Each milestone needs a "title", "desc", and "prize" (pretend dollars),
// plus ONE trigger:
//   "pages": 1000 / "book": 3     (reading)
//   "value": 5                    reached that number (unassisted reps for pullups)
//   "percent": 50                 percent of the main goal
//   "band": "orange", "reps": 8   (pullups) that many reps on that band or a lighter one
//   "time": "31:30"               (time) ran the distance at or under that time
//   "distance": 3                 (time) completed a run at least that long
//   "streak": 7                   logged this many days in a row
//   "sessions": 10                logged this many separate days
//   "weekDays": 6                 logged on this many days within one Mon-Sun week
//   "bookDone": "1 Kings"         (chapters) every listed chapter in that book
//                                 (or a list: ["1 Kings", "2 Kings"])
//   "done": "YYYY-MM-DD"          anything else - set the date by hand
// Instead of "prize" a milestone can have "reward": "Paper towels" (text only).
//
// ---------- Side quests ----------
// "sideQuests": [ { "title": "Plank", "type": "best", "unit": "seconds",
//                   "target": 120, "log": [ { "date": "...", "value": 45 } ] } ]
// Money goals: use "type": "total", "prefix": "$", no "unit", and log each
// deposit as { "date": "YYYY-MM-DD", "value": 2, "note": "chores" }.
// Optional mini ladder: "milestones": [ { "title": "...", "desc": "...", "value": 5 } ]

(function () {
  var DATA_DIR = "/files/beast-challenge/";
  var PEOPLE = ["hans", "jordyn", "lucy", "fletcher", "bennett"];
  var DAY_MS = 86400000;

  // Default band ladder - most assistance first. A person or challenge can
  // override this with its own "bands" list.
  // "assist" is the manufacturer's range of help, in pounds [min, max].
  var DEFAULT_BANDS = [
    { id: "purple", label: "Purple", color: "#7b3fb5", assist: [60, 170] },
    { id: "red", label: "Red", color: "#d33a2c", assist: [50, 135] },
    { id: "orange", label: "Orange", color: "#f07c00", assist: [35, 115] },
    { id: "dark-green", label: "Dark Green", color: "#1f7a3a", assist: [15, 60] },
    { id: "light-green", label: "Light Green", color: "#7ccf5a", assist: [5, 30] },
  ];

  // ---------- small helpers ----------
  function parseDate(iso) {
    if (!iso) return null;
    var p = String(iso).split("-");
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  function isoToday() {
    var t = today();
    return t.getFullYear() + "-" + String(t.getMonth() + 1).padStart(2, "0") + "-" + String(t.getDate()).padStart(2, "0");
  }

  function today() {
    var n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  }

  function daysBetween(a, b) {
    return Math.round((b - a) / DAY_MS);
  }

  // Monday that starts the week a date falls in, as "YYYY-MM-DD".
  function weekKey(iso) {
    var d = parseDate(iso);
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function isRest(d, restDays) {
    return !!restDays && restDays.indexOf(d.getDay()) !== -1;
  }

  // Counts days from a to b (inclusive) that aren't rest days.
  function workDays(a, b, restDays) {
    var n = 0;
    for (var d = new Date(a); d <= b; d.setDate(d.getDate() + 1)) if (!isRest(d, restDays)) n++;
    return n;
  }

  // True when every day strictly between a and b is a rest day.
  function onlyRestBetween(a, b, restDays) {
    for (var d = new Date(a.getFullYear(), a.getMonth(), a.getDate() + 1); d < b; d.setDate(d.getDate() + 1)) {
      if (!isRest(d, restDays)) return false;
    }
    return true;
  }

  function fmtDate(iso) {
    var d = parseDate(iso);
    return d ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";
  }

  function fmtNum(n) {
    var rounded = Math.round(n * 10) / 10;
    return rounded.toLocaleString("en-US", { maximumFractionDigits: 1 });
  }

  function fmtMoney(n) {
    return "$" + Math.round(n).toLocaleString("en-US");
  }

  function fmtPct(p) {
    if (!isFinite(p) || p <= 0) return "0%";
    return (p >= 100 ? 100 : Math.floor(p * 10) / 10) + "%";
  }

  // "31:42" -> 1902 seconds. Also accepts "1:02:10" or a plain number of minutes.
  function parseTime(t) {
    if (t == null || t === "") return null;
    if (typeof t === "number") return t * 60;
    var parts = String(t).split(":").map(Number);
    if (parts.some(isNaN)) return null;
    return parts.reduce(function (s, n) { return s * 60 + n; }, 0);
  }

  function fmtTime(sec) {
    if (sec == null || !isFinite(sec)) return "-";
    sec = Math.round(sec);
    var h = Math.floor(sec / 3600);
    var m = Math.floor((sec % 3600) / 60);
    var s = sec % 60;
    var mm = h ? String(m).padStart(2, "0") : String(m);
    return (h ? h + ":" : "") + mm + ":" + String(s).padStart(2, "0");
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined && text !== null) e.textContent = text;
    return e;
  }

  function progressBar(pct, extraClass) {
    pct = isFinite(pct) ? Math.max(0, pct) : 0;
    var track = el("div", "progress-track" + (extraClass ? " " + extraClass : ""));
    track.setAttribute("role", "progressbar");
    track.setAttribute("aria-valuemin", "0");
    track.setAttribute("aria-valuemax", "100");
    track.setAttribute("aria-valuenow", Math.min(100, pct).toFixed(1));
    var fill = el("div", "progress-fill");
    track.appendChild(fill);
    // Let the bar animate in after it's on the page.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        fill.style.width = (pct > 0 ? Math.max(Math.min(pct, 100), 1.5) : 0) + "%";
      });
    });
    return track;
  }

  function sortByDate(log) {
    return (log || [])
      .filter(function (e) { return e && e.date; })
      .slice()
      .sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
  }

  function loadPerson(id) {
    return fetch(DATA_DIR + id + ".json", { cache: "no-cache" }).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    }).then(function (data) {
      data.id = id;
      return analyzePerson(data);
    });
  }

  // ---------- the math ----------

  // For "chapters" challenges: turns "Psalms 9-11" (or a list of those) into
  // keys like "Psalms|9", keeping only chapters that are on the list.
  function chapterKeys(read, books) {
    var refs = Array.isArray(read) ? read : [read];
    var keys = [];
    refs.forEach(function (ref) {
      if (!ref) return;
      var m = String(ref).trim().match(/^(.*?)\s+(\d+)(?:\s*-\s*(\d+))?$/);
      var name = (m ? m[1] : String(ref)).trim().toLowerCase();
      var book = null;
      for (var i = 0; i < books.length; i++) if (books[i].book.toLowerCase() === name) { book = books[i]; break; }
      if (!book) return;
      var from = m ? Number(m[2]) : -Infinity;
      var to = m ? Number(m[3] || m[2]) : Infinity;
      book.chapters.forEach(function (ch) {
        if (ch >= from && ch <= to) keys.push(book.book + "|" + ch);
      });
    });
    return keys;
  }

  // Turns a challenge's log into day-by-day states: { date, value, sessions, streak }.
  // For "time" challenges, value is the best (lowest) qualifying time in seconds.
  function buildTimeline(c) {
    var type = c.type;
    var books = c.books || [];
    var entries = sortByDate(c.log);

    var cumulativeBefore = [0];
    books.forEach(function (b, i) {
      cumulativeBefore[i + 1] = cumulativeBefore[i] + Number(b.pages || 0);
    });
    if (type === "chapters") books = books.map(function (b) { return { book: b.book, chapters: b.chapters || [] }; });

    var timeline = [];
    var value = type === "time" ? null : 0;
    var sessions = 0;
    var streak = 0;
    var prevDate = null;
    var distance = Number(c.distance || 0);
    var seen = {};
    var weeks = {};
    var restDays = c.restDays || null;

    entries.forEach(function (e) {
      if (type === "weekly") {
        var wk = weekKey(e.date);
        if (!weeks[wk]) { weeks[wk] = true; value++; }
      } else if (type === "counter") {
        value += e.count != null ? Number(e.count) || 0 : 1;
      } else if (type === "chapters") {
        e._new = 0;
        chapterKeys(e.read, books).forEach(function (k) {
          if (!seen[k]) { seen[k] = true; value++; e._new++; }
        });
        e._total = value;
      } else if (type === "reading") {
        var bookIdx = Math.max(1, Math.min(books.length, Number(e.book) || 1));
        var v = cumulativeBefore[bookIdx - 1] + Math.min(Number(e.page) || 0, Number(books[bookIdx - 1].pages));
        value = Math.max(value, v); // never go backwards if a re-read gets logged
      } else if (type === "total") {
        value += Number(e.value) || 0;
      } else if (type === "pullups") {
        if (!e.band || e.band === "none") value = Math.max(value, Number(e.reps) || 0);
      } else if (type === "time") {
        var sec = parseTime(e.time);
        if (sec && Number(e.miles || 0) >= distance) value = value == null ? sec : Math.min(value, sec);
      } else {
        value = Math.max(value, Number(e.value) || 0);
      }

      if (e.date !== prevDate) {
        sessions++;
        var gap = prevDate ? daysBetween(parseDate(prevDate), parseDate(e.date)) : null;
        var keepsStreak = gap === 1 || (gap > 1 && restDays && onlyRestBetween(parseDate(prevDate), parseDate(e.date), restDays));
        streak = keepsStreak ? streak + 1 : 1;
        prevDate = e.date;
        timeline.push({ date: e.date, value: value, sessions: sessions, streak: streak });
      } else {
        timeline[timeline.length - 1].value = value;
      }
    });

    return { timeline: timeline, cumulativeBefore: cumulativeBefore, entries: entries, seen: seen, weeks: weeks };
  }

  function bandRank(bands, id) {
    if (!id || id === "none") return bands.length; // no band = hardest
    for (var i = 0; i < bands.length; i++) if (bands[i].id === id) return i;
    return -1;
  }

  function bandLabel(bands, id) {
    if (!id || id === "none") return "No band";
    for (var i = 0; i < bands.length; i++) if (bands[i].id === id) return bands[i].label;
    return id;
  }

  // Figures out when (if ever) a milestone was hit, and how close it is now.
  function evalMilestone(m, c) {
    var tl = c.timeline;
    var out = {
      title: m.title, desc: m.desc, prize: Number(m.prize || 0), reward: m.reward || null,
      metric: "value", at: 0, current: 0, hitDate: null, lowerIsBetter: false,
    };
    function firstWhere(fn) {
      for (var i = 0; i < tl.length; i++) if (fn(tl[i])) return tl[i].date;
      return null;
    }

    if (m.done !== undefined && m.pages == null && m.value == null && m.book == null &&
        m.percent == null && m.streak == null && m.sessions == null && m.band == null &&
        m.time == null && m.distance == null) {
      out.metric = "manual";
      out.hitDate = m.done || null;
      return out;
    }

    if (m.band != null) {
      // Pull-ups on a given band or anything lighter.
      out.metric = "band";
      out.at = Number(m.reps || 0);
      out.bandText = bandLabel(c.bands, m.band);
      var need = bandRank(c.bands, m.band);
      c.entries.forEach(function (e) {
        if (bandRank(c.bands, e.band) >= need) {
          var reps = Number(e.reps) || 0;
          out.current = Math.max(out.current, reps);
          if (!out.hitDate && reps >= out.at) out.hitDate = e.date;
        }
      });
      return out;
    }

    if (m.time != null) {
      out.lowerIsBetter = true;
      out.at = parseTime(m.time);
      out.current = c.value;
      out.hitDate = firstWhere(function (s) { return s.value != null && s.value <= out.at; });
      return out;
    }

    if (m.distance != null) {
      out.metric = "distance";
      out.at = Number(m.distance);
      c.entries.forEach(function (e) {
        var mi = Number(e.miles) || 0;
        out.current = Math.max(out.current, mi);
        if (!out.hitDate && mi >= out.at) out.hitDate = e.date;
      });
      return out;
    }

    if (m.bookDone != null) {
      var names = Array.isArray(m.bookDone) ? m.bookDone : [m.bookDone];
      var need = [];
      c.books.forEach(function (b) {
        if (names.indexOf(b.book) !== -1) b.chapters.forEach(function (ch) { need.push(b.book + "|" + ch); });
      });
      out.metric = "bookDone";
      out.at = need.length;
      var have = {};
      c.entries.forEach(function (e) {
        chapterKeys(e.read, c.books).forEach(function (k) { have[k] = true; });
        var count = need.filter(function (k) { return have[k]; }).length;
        out.current = count;
        if (!out.hitDate && count >= need.length && need.length) out.hitDate = e.date;
      });
      return out;
    }

    if (m.weekDays != null) {
      out.metric = "weekDays";
      out.at = Number(m.weekDays);
      var perWeek = {};
      var counted = {};
      c.entries.forEach(function (e) {
        var wk = weekKey(e.date);
        if (counted[e.date]) return;
        counted[e.date] = true;
        perWeek[wk] = (perWeek[wk] || 0) + 1;
        out.current = Math.max(out.current, perWeek[wk]);
        if (!out.hitDate && perWeek[wk] >= out.at) out.hitDate = e.date;
      });
      // Show this week's count while it's still in progress.
      var thisWeek = perWeek[weekKey(isoToday())] || 0;
      if (!out.hitDate) out.current = Math.max(thisWeek, out.current);
      return out;
    }

    if (m.streak != null || m.sessions != null) {
      out.metric = m.streak != null ? "streak" : "sessions";
      out.at = Number(m.streak != null ? m.streak : m.sessions);
      out.current = m.streak != null ? c.currentStreak : c.sessions;
      out.hitDate = firstWhere(function (s) { return s[out.metric] >= out.at; });
      return out;
    }

    if (m.percent != null && c.type === "time") {
      // Percent of the way from baseline to target time.
      out.at = Number(m.percent);
      out.metric = "percent";
      out.current = c.pct;
      var span = c.baseline - c.target;
      out.hitDate = firstWhere(function (s) {
        return s.value != null && span > 0 && ((c.baseline - s.value) / span) * 100 >= out.at;
      });
      return out;
    }

    out.at = m.pages != null ? Number(m.pages)
      : m.value != null ? Number(m.value)
      : m.book != null ? c.cumulativeBefore[Number(m.book)]
      : m.percent != null ? c.target * Number(m.percent) / 100 : 0;
    out.current = c.value;
    out.hitDate = firstWhere(function (s) { return s.value >= out.at; });
    return out;
  }

  // Works out everything about one challenge. "defaults" fills in anything
  // the challenge doesn't set itself (start, deadline, bands).
  function analyzeChallenge(raw, defaults) {
    var c = { raw: raw };
    c.type = raw.type || "planning";
    c.books = raw.books || [];
    c.bands = raw.bands || defaults.bands || DEFAULT_BANDS;
    c.distance = Number(raw.distance || 0);

    c.restDays = raw.restDays || null;
    var built = buildTimeline({ type: c.type, books: c.books, log: raw.log, distance: c.distance, restDays: c.restDays });
    c.entries = built.entries;
    c.timeline = built.timeline;
    c.cumulativeBefore = built.cumulativeBefore;
    c.seen = built.seen;
    c.listTotal = c.type === "chapters"
      ? c.books.reduce(function (s, b) { return s + (b.chapters || []).length; }, 0) : 0;
    var last = c.timeline[c.timeline.length - 1];
    c.sessions = last ? last.sessions : 0;

    var t = today();
    var start = parseDate(raw.start || defaults.start) || t;
    var deadline = parseDate(raw.deadline || defaults.deadline) || new Date(t.getFullYear(), 11, 31);
    c.start = raw.start || defaults.start;
    c.deadline = raw.deadline || defaults.deadline;
    c.daysLeft = Math.max(0, daysBetween(t, deadline) + 1); // includes today
    c.spanDays = Math.max(1, daysBetween(start, deadline) + 1);
    c.elapsedDays = Math.min(c.spanDays, Math.max(0, daysBetween(start, t)));
    if (c.restDays) {
      // Only count the days that are actually for working on it.
      var yesterday = new Date(t.getFullYear(), t.getMonth(), t.getDate() - 1);
      c.workDaysLeft = t <= deadline ? workDays(t, deadline, c.restDays) : 0;
      c.spanDays = Math.max(1, workDays(start, deadline, c.restDays));
      c.elapsedDays = Math.min(c.spanDays, start <= yesterday ? workDays(start, yesterday, c.restDays) : 0);
    } else {
      c.workDaysLeft = c.daysLeft;
    }

    if (c.type === "time") {
      c.target = parseTime(raw.target);
      c.value = last ? last.value : null;
      var firstQualifying = c.timeline.filter(function (s) { return s.value != null; })[0];
      c.baseline = parseTime(raw.baseline) || (firstQualifying ? firstQualifying.value : null);
      var span = c.baseline != null ? c.baseline - c.target : 0;
      c.pct = c.value != null && span > 0 ? ((c.baseline - c.value) / span) * 100
        : c.value != null && c.value <= c.target ? 100 : 0;
      c.complete = c.value != null && c.value <= c.target;
    } else {
      c.target = c.type === "reading" ? c.cumulativeBefore[c.books.length]
        : c.type === "chapters" ? Number(raw.target || c.listTotal) : Number(raw.target || 0);
      c.value = last ? last.value : 0;
      c.pct = c.target > 0 ? (c.value / c.target) * 100 : 0;
      c.complete = c.target > 0 && c.value >= c.target;
    }
    c.pct = Math.max(0, c.pct);
    c.expected = c.target * (c.elapsedDays / c.spanDays);

    // Current streak only counts if the last log was today or yesterday.
    c.currentStreak = last && (daysBetween(parseDate(last.date), t) <= 1 ||
      (c.restDays && onlyRestBetween(parseDate(last.date), t, c.restDays))) ? last.streak : 0;
    if (c.type === "weekly") {
      c.weekDone = !!built.weeks[weekKey(isoToday())];
      c.weeksLeft = Math.max(0, Math.ceil((daysBetween(parseDate(weekKey(isoToday())), deadline) + 1) / 7));
    }
    c.bestStreak = c.timeline.reduce(function (m, s) { return Math.max(m, s.streak); }, 0);

    c.milestones = (raw.milestones || []).map(function (m) { return evalMilestone(m, c); });
    c.prizeTotal = c.milestones.reduce(function (s, m) { return s + m.prize; }, 0) + Number(raw.prizePlaceholder || 0);
    c.prizeWon = c.milestones.reduce(function (s, m) { return s + (m.hitDate ? m.prize : 0); }, 0);
    c.nextMilestone = c.milestones.filter(function (m) { return !m.hitDate && m.metric !== "manual"; })[0] || null;
    return c;
  }

  function analyzePerson(d) {
    var defaults = { start: d.start, deadline: d.deadline, bands: d.bands };
    var list = d.challenges ? d.challenges : [d];
    var p = { raw: d, multi: !!d.challenges };
    p.challenges = list.map(function (raw) { return analyzeChallenge(raw, defaults); });
    p.active = p.challenges.filter(function (c) { return c.type !== "planning" && c.type !== "tbd" && c.type !== "counter"; });
    p.counterOnly = p.challenges.length > 0 && p.challenges.every(function (c) { return c.type === "counter"; });
    p.prizeTotal = p.challenges.reduce(function (s, c) { return s + c.prizeTotal; }, 0);
    p.prizeWon = p.challenges.reduce(function (s, c) { return s + c.prizeWon; }, 0);
    p.pct = p.active.length
      ? p.active.reduce(function (s, c) { return s + Math.min(100, c.pct); }, 0) / p.active.length : 0;
    p.complete = p.active.length > 0 && p.active.every(function (c) { return c.complete; });
    p.daysLeft = p.challenges.length ? p.challenges[0].daysLeft : 0;
    var nexts = p.active.map(function (c) { return c.nextMilestone; }).filter(Boolean);
    p.nextMilestone = nexts[0] || null;
    return p;
  }

  // Human-readable "where things stand" line for a challenge.
  function progressText(c) {
    var unit = c.raw.unit ? " " + c.raw.unit : "";
    if (c.type === "time") {
      if (c.value == null) return "No " + fmtNum(c.distance) + "-mile run logged yet · goal " + fmtTime(c.target);
      return "Best " + fmtTime(c.value) + " · goal " + fmtTime(c.target);
    }
    if (c.type === "pullups") return fmtNum(c.value) + " / " + fmtNum(c.target) + " unassisted pull-ups";
    return fmtNum(c.value) + " / " + fmtNum(c.target) + unit;
  }

  // ---------- landing page ----------
  function renderLanding(root) {
    var countdownEl = root.querySelector("[data-countdown]");
    var poolEl = root.querySelector("[data-pool]");
    var grid = root.querySelector("[data-challenger-grid]");

    Promise.all(PEOPLE.map(function (id) {
      return loadPerson(id).catch(function (err) {
        console.error("Beast challenge: couldn't load " + id, err);
        return null;
      });
    })).then(function (people) {
      people = people.filter(Boolean);
      if (!people.length) {
        grid.textContent = "Couldn't load the challenges right now - try refreshing.";
        return;
      }

      if (countdownEl) {
        var days = people[0].daysLeft;
        countdownEl.textContent = days > 0 ? days + (days === 1 ? " day" : " days") : "Time's up!";
      }

      if (poolEl) {
        var won = people.reduce(function (s, p) { return s + p.prizeWon; }, 0);
        var total = people.reduce(function (s, p) { return s + p.prizeTotal; }, 0);
        poolEl.innerHTML = "";
        poolEl.appendChild(el("p", "pool-value", fmtMoney(won)));
        poolEl.appendChild(el("p", "pool-sub", "unlocked of a " + fmtMoney(total) + " pretend prize pool"));
        poolEl.appendChild(progressBar(total ? (won / total) * 100 : 0));
      }

      grid.innerHTML = "";
      people.forEach(function (p) {
        var d = p.raw;
        var card = el("a", "challenger-card");
        card.href = "/hobby/beast-challenge/" + d.id + "/";
        card.appendChild(el("span", "challenger-emoji", d.emoji || "⭐"));
        card.appendChild(el("h4", "challenger-name", d.name));
        card.appendChild(el("p", "challenger-goal", d.title));

        if (p.counterOnly) {
          var cc = p.challenges[0];
          card.classList.add("is-counter");
          card.appendChild(el("p", "counter-mini", fmtNum(cc.value)));
          card.appendChild(el("p", "challenger-status", (cc.raw.unit || "logged") + " so far"));
          var lastE = cc.entries[cc.entries.length - 1];
          card.appendChild(el("p", "challenger-next", lastE ? "Most recent: " + fmtDate(lastE.date) : "Nothing yet... suspicious."));
        } else if (!p.active.length) {
          card.appendChild(el("p", "challenger-status", "Challenge being decided - stay tuned!"));
        } else {
          card.appendChild(progressBar(p.pct));
          if (p.multi) {
            card.appendChild(el("p", "challenger-status",
              p.challenges.length + " challenges · " + fmtPct(p.pct) + " overall"));
          } else {
            card.appendChild(el("p", "challenger-status", progressText(p.challenges[0]) + " · " + fmtPct(p.pct)));
          }
          card.appendChild(el("p", "challenger-prize", fmtMoney(p.prizeWon) + " of " + fmtMoney(p.prizeTotal) + " unlocked"));
          if (p.complete) {
            card.classList.add("is-complete");
            card.appendChild(el("p", "challenger-next", "🏆 CHALLENGE COMPLETE!"));
          } else if (p.nextMilestone) {
            card.appendChild(el("p", "challenger-next", "Next up: " + p.nextMilestone.title));
          }
        }
        card.appendChild(el("span", "challenger-link", "See " + d.name + "'s page →"));
        grid.appendChild(card);
      });
    });
  }

  // ---------- challenger page ----------
  function statTile(label, value, sub, main) {
    var t = el("div", "stat-tile" + (main ? " stat-tile-main" : ""));
    t.appendChild(el("p", "stat-label", label));
    t.appendChild(el("p", "stat-value", value));
    if (sub) t.appendChild(el("p", "stat-sub", sub));
    return t;
  }

  function section(title, cls) {
    var s = el("section", "beast-section" + (cls ? " " + cls : ""));
    if (title) s.appendChild(el("h3", null, title));
    return s;
  }

  function slug(str) {
    return String(str).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function renderPerson(root, p) {
    var d = p.raw;
    document.title = d.name + "'s Challenge" + (p.multi ? "s" : "") + " | Hans M. Haroldsen";
    root.innerHTML = "";

    // Hero
    var hero = el("section", "hero beast-hero");
    hero.appendChild(el("p", "beast-kicker", d.name + "'s Challenge" + (p.multi ? "s" : "")));
    hero.appendChild(el("h2", null, (d.emoji ? d.emoji + " " : "") + d.title));
    if (d.blurb) hero.appendChild(el("p", "hero-blurb", d.blurb));
    hero.appendChild(el("p", "beast-deadline",
      "Deadline: " + fmtDate(d.deadline) + " · " + p.daysLeft + (p.daysLeft === 1 ? " day" : " days") + " left"));
    root.appendChild(hero);

    if (!p.multi) {
      var c = p.challenges[0];
      if (c.type === "counter") {
        renderCounter(root, c);
        renderMilestones(root, c, "Achievements (Sort Of)");
        renderLog(root, c, "The Evidence");
        renderIdeas(root, d.ideas, "Idea Board");
        return;
      }
      if (!p.active.length) {
        var tbd = section("Coming Soon", "beast-tbd");
        tbd.appendChild(el("p", null, "This challenge hasn't been locked in yet. Once it's picked, the tracker, milestones, and prize ladder will show up right here."));
        root.appendChild(tbd);
        renderIdeas(root, d.ideas, "Challenge Ideas on the Table");
        return;
      }
      renderBigProgress(root, c);
      renderStats(root, c, true);
      if (c.type === "reading") renderBookshelf(root, c);
      if (c.type === "pullups") renderBandLadder(root, c);
      if (c.type === "chapters") renderChapterList(root, c);
      renderMilestones(root, c, "Milestones & Prize Ladder");
      renderSideQuests(root, d.sideQuests);
      renderLog(root, c, "Progress Log");
      renderIdeas(root, d.ideas, "Idea Board");
      return;
    }

    // ----- several challenges -----
    var overview = el("section", "beast-overview");
    var stats = el("div", "beast-stats");
    stats.appendChild(statTile("Prize Unlocked", fmtMoney(p.prizeWon), "of " + fmtMoney(p.prizeTotal) + " (pretend)", true));
    stats.appendChild(statTile("Overall", fmtPct(p.pct), "average across active challenges"));
    stats.appendChild(statTile("Challenges", String(p.challenges.length),
      p.active.length + " active · " + (p.challenges.length - p.active.length) + " in planning"));
    overview.appendChild(stats);

    var grid = el("div", "challenge-overview-grid");
    p.challenges.forEach(function (c) {
      var a = el("a", "challenge-mini" + (c.complete ? " is-complete" : ""));
      a.href = "#" + slug(c.raw.title);
      if (c.raw.area) a.appendChild(el("span", "area-tag area-" + slug(c.raw.area), c.raw.area));
      a.appendChild(el("p", "challenge-mini-title", (c.raw.emoji ? c.raw.emoji + " " : "") + c.raw.title));
      if (c.type === "planning") {
        a.appendChild(el("p", "challenge-mini-meta", "Still being planned"));
      } else {
        a.appendChild(progressBar(c.pct));
        a.appendChild(el("p", "challenge-mini-meta", fmtPct(c.pct) + " · " + fmtMoney(c.prizeWon) + " of " + fmtMoney(c.prizeTotal)));
      }
      grid.appendChild(a);
    });
    overview.appendChild(grid);
    root.appendChild(overview);

    p.challenges.forEach(function (c) {
      var wrap = el("section", "challenge-block");
      wrap.id = slug(c.raw.title);
      var head = el("div", "challenge-head");
      if (c.raw.area) head.appendChild(el("span", "area-tag area-" + slug(c.raw.area), c.raw.area));
      head.appendChild(el("h3", null, (c.raw.emoji ? c.raw.emoji + " " : "") + c.raw.title));
      if (c.raw.blurb) head.appendChild(el("p", "challenge-blurb", c.raw.blurb));
      wrap.appendChild(head);

      if (c.type === "planning") {
        renderIdeas(wrap, c.raw.ideas, "Ideas on the Table", true);
      } else {
        renderBigProgress(wrap, c);
        renderStats(wrap, c, false);
        if (c.type === "pullups") renderBandLadder(wrap, c);
        if (c.type === "chapters") renderChapterList(wrap, c);
        renderMilestones(wrap, c, "Milestones", true);
        renderLog(wrap, c, "Log", true);
      }
      root.appendChild(wrap);
    });

    renderIdeas(root, d.ideas, "Idea Board");
  }

  // For "counter" challenges: no goal, just a running tally.
  function renderCounter(root, c) {
    var big = el("section", "beast-progress beast-counter");
    big.appendChild(el("p", "beast-percent", fmtNum(c.value)));
    big.appendChild(el("p", "beast-progress-detail", (c.raw.unit || "logged") + " since " + fmtDate(c.start)));
    root.appendChild(big);

    var t = today();
    var weekStart = parseDate(weekKey(isoToday()));
    var thisWeek = 0;
    var perDay = {};
    c.entries.forEach(function (e) {
      var n = e.count != null ? Number(e.count) || 0 : 1;
      if (parseDate(e.date) >= weekStart) thisWeek += n;
      perDay[e.date] = (perDay[e.date] || 0) + n;
    });
    var worst = null;
    Object.keys(perDay).forEach(function (k) { if (!worst || perDay[k] > perDay[worst]) worst = k; });
    var last = c.entries[c.entries.length - 1];
    var since = last ? daysBetween(parseDate(last.date), t) : null;

    var stats = el("section", "beast-stats");
    stats.appendChild(statTile("This Week", String(thisWeek), "since Monday", true));
    stats.appendChild(statTile("Days Since Last", since == null ? "-" : String(since),
      since == null ? "nothing yet" : since === 0 ? "it happened today" : "dry days in a row"));
    stats.appendChild(statTile("Messiest Day", worst ? String(perDay[worst]) : "-", worst ? fmtDate(worst) : "TBD"));
    stats.appendChild(statTile("Days Left", String(c.daysLeft), "to keep counting"));
    root.appendChild(stats);
  }

  function renderBigProgress(root, c) {
    var big = el("section", "beast-progress");
    big.appendChild(el("p", "beast-percent", fmtPct(c.pct)));
    big.appendChild(progressBar(c.pct, "beast-track"));
    var detail;
    if (c.type === "time") {
      detail = c.value == null
        ? "Goal: " + fmtNum(c.distance) + " miles in " + fmtTime(c.target) + " or less - log a run to set the baseline"
        : "Best " + fmtTime(c.value) + " · started at " + fmtTime(c.baseline) + " · goal " + fmtTime(c.target) +
          (c.complete ? " - DONE! 🏆" : " - " + fmtTime(c.value - c.target) + " to cut");
    } else {
      if (c.raw.unit && c.raw.unit.charAt(0) === "%") {
        // e.g. "% paid off" -> "12% paid off - 88% to go"
        detail = fmtNum(c.value) + c.raw.unit +
          (c.complete ? " - DONE! 🏆" : " - " + fmtNum(c.target - c.value) + "% to go");
      } else {
        var unit = c.type === "pullups" ? " unassisted pull-ups" : (c.raw.unit ? " " + c.raw.unit : "");
        detail = fmtNum(c.value) + " of " + fmtNum(c.target) + unit +
          (c.complete ? " - DONE! 🏆" : " - " + fmtNum(c.target - c.value) + " to go");
      }
    }
    big.appendChild(el("p", "beast-progress-detail", detail));
    if (c.complete) big.classList.add("is-complete");
    root.appendChild(big);
  }

  function renderStats(root, c, showPrize) {
    var stats = el("section", "beast-stats");
    var unit = c.raw.unit || "";
    if (showPrize) stats.appendChild(statTile("Prize Unlocked", fmtMoney(c.prizeWon), "of " + fmtMoney(c.prizeTotal) + " (pretend)", true));
    else stats.appendChild(statTile("Prize", fmtMoney(c.prizeWon), "of " + fmtMoney(c.prizeTotal), true));

    if (c.type === "weekly") {
      stats.appendChild(statTile("This Week", c.weekDone ? "✅ Done" : "Not yet", c.weekDone ? "nice work!" : "the week ends Sunday"));
      stats.appendChild(statTile("Weeks Left", String(c.weeksLeft), "including this one"));
      stats.appendChild(statTile("Weeks Done", fmtNum(c.value) + " / " + fmtNum(c.target), "goal by " + fmtDate(c.deadline)));
    } else if (c.type === "reading" || c.type === "total" || c.type === "chapters") {
      var remaining = Math.max(0, c.target - c.value);
      var perDay = c.workDaysLeft > 0 ? remaining / c.workDaysLeft : remaining;
      stats.appendChild(statTile(c.restDays ? "Needed Per Study Day" : "Needed Per Day", c.complete ? "0" : fmtNum(Math.ceil(perDay * 10) / 10),
        unit + (c.restDays ? " per day, " + c.workDaysLeft + " days left (no Sundays)" : " a day to finish on time")));
      var diff = c.value - c.expected;
      var paceLabel = c.complete ? "Finished!" : Math.abs(diff) < 0.5 ? "On pace" :
        diff > 0 ? fmtNum(diff) + " ahead" : fmtNum(-diff) + " behind";
      stats.appendChild(statTile("Pace Check", paceLabel, "vs. an even pace from " + fmtDate(c.start)));
      stats.appendChild(statTile("Current Streak", String(c.currentStreak),
        (c.restDays ? "days in a row (Sundays off)" : "days in a row") + " · best " + c.bestStreak));
    } else if (c.type === "pullups") {
      var lastEntry = c.entries[c.entries.length - 1];
      stats.appendChild(statTile("Unassisted Best", fmtNum(c.value), "pull-ups in one set"));
      stats.appendChild(statTile("Workouts", String(c.sessions), c.sessions === 1 ? "day logged" : "days logged"));
      stats.appendChild(statTile("Last Set", lastEntry ? (Number(lastEntry.reps) || 0) + " reps" : "-",
        lastEntry ? bandLabel(c.bands, lastEntry.band) + " · " + fmtDate(lastEntry.date) : "nothing logged yet"));
    } else if (c.type === "time") {
      var runs = c.entries.length;
      var miles = c.entries.reduce(function (s, e) { return s + (Number(e.miles) || 0); }, 0);
      var bestPace = c.value != null && c.distance ? c.value / c.distance : null;
      stats.appendChild(statTile("Best " + fmtNum(c.distance) + " mi", fmtTime(c.value), "goal " + fmtTime(c.target)));
      stats.appendChild(statTile("Best Pace", bestPace ? fmtTime(bestPace) : "-",
        "per mile · goal " + fmtTime(c.target / (c.distance || 1))));
      stats.appendChild(statTile("Runs Logged", String(runs), fmtNum(miles) + " total miles"));
    } else {
      stats.appendChild(statTile("Personal Best", fmtNum(c.value), unit));
      stats.appendChild(statTile("Days Logged", String(c.sessions), c.sessions === 1 ? "entry" : "entries"));
      stats.appendChild(statTile("Days Left", String(c.daysLeft), "until " + fmtDate(c.deadline)));
    }
    root.appendChild(stats);
  }

  function renderBookshelf(root, c) {
    var s = section("The Bookshelf", "beast-bookshelf");
    var list = el("ol", "book-list");
    c.books.forEach(function (b, i) {
      var startAt = c.cumulativeBefore[i];
      var read = Math.max(0, Math.min(Number(b.pages), c.value - startAt));
      var pct = (read / Number(b.pages)) * 100;
      var li = el("li", "book" + (pct >= 100 ? " done" : read > 0 ? " reading" : ""));
      var head = el("div", "book-head");
      head.appendChild(el("span", "book-icon", pct >= 100 ? "✅" : read > 0 ? "📖" : "📕"));
      head.appendChild(el("span", "book-title", "Book " + (i + 1) + ": " + b.title));
      head.appendChild(el("span", "book-pages", read + " / " + b.pages));
      li.appendChild(head);
      li.appendChild(progressBar(pct));
      list.appendChild(li);
    });
    s.appendChild(list);
    s.appendChild(el("p", "beast-note", "Page counts are from the US hardcover editions."));
    root.appendChild(s);
  }

  // Book-by-book progress through a chapter reading list.
  function renderChapterList(root, c) {
    var s = el("div", "band-ladder chapter-list");
    s.appendChild(el("h4", null, "The Reading List"));
    s.appendChild(el("p", "beast-note", c.listTotal + " chapters left on the list overall - the goal is " + fmtNum(c.target) + " of them by " + fmtDate(c.deadline) + "."));
    var ol = el("ol", "book-list");
    c.books.forEach(function (b) {
      var read = b.chapters.filter(function (ch) { return c.seen[b.book + "|" + ch]; }).length;
      var pct = b.chapters.length ? (read / b.chapters.length) * 100 : 0;
      var li = el("li", "book" + (pct >= 100 ? " done" : read > 0 ? " reading" : ""));
      var head = el("div", "book-head");
      head.appendChild(el("span", "book-icon", pct >= 100 ? "✅" : read > 0 ? "📖" : "📕"));
      head.appendChild(el("span", "book-title", b.book));
      head.appendChild(el("span", "book-pages", read + " / " + b.chapters.length));
      li.appendChild(head);
      li.appendChild(progressBar(pct));
      var left = b.chapters.filter(function (ch) { return !c.seen[b.book + "|" + ch]; });
      if (left.length && left.length < b.chapters.length + 1) {
        li.appendChild(el("p", "chapter-left", "Left: " + compressChapters(left)));
      }
      ol.appendChild(li);
    });
    s.appendChild(ol);
    root.appendChild(s);
  }

  // [1,2,3,5,7,8] -> "1-3, 5, 7-8"
  function compressChapters(list) {
    var out = [];
    for (var i = 0; i < list.length; i++) {
      var start = list[i];
      while (i + 1 < list.length && list[i + 1] === list[i] + 1) i++;
      out.push(start === list[i] ? String(start) : start + "-" + list[i]);
    }
    return out.join(", ");
  }

  // Best set on each band, from most help to no help.
  function renderBandLadder(root, c) {
    var s = el("div", "band-ladder");
    s.appendChild(el("h4", null, "Band Ladder"));
    s.appendChild(el("p", "beast-note", "Best set on each band - work down the ladder toward no band at all. Each band's pounds of help is its stretch range: the more it stretches, the more it lifts."));
    var ul = el("ul", "band-list");
    var rows = c.bands.concat([{ id: "none", label: "No band", color: "var(--primary-color)" }]);
    rows.forEach(function (b) {
      var best = 0;
      var when = null;
      c.entries.forEach(function (e) {
        var id = e.band || "none";
        if (id === b.id && (Number(e.reps) || 0) > best) { best = Number(e.reps) || 0; when = e.date; }
      });
      var li = el("li", "band-row" + (best ? " has-reps" : ""));
      var sw = el("span", "band-swatch");
      sw.style.background = b.color || "#999";
      li.appendChild(sw);
      var nameWrap = el("span", "band-name", b.label);
      var assistText = b.id === "none" ? "0 lb of help - all you"
        : b.assist ? b.assist[0] + "-" + b.assist[1] + " lb of help" : "";
      if (assistText) nameWrap.appendChild(el("span", "band-assist", assistText));
      li.appendChild(nameWrap);
      li.appendChild(el("span", "band-best", best ? best + " reps" : "-"));
      li.appendChild(el("span", "band-when", when ? fmtDate(when) : ""));
      ul.appendChild(li);
    });
    s.appendChild(ul);
    root.appendChild(s);
  }

  function milestoneMeta(m) {
    if (m.hitDate) return "Unlocked " + fmtDate(m.hitDate);
    if (m.metric === "manual") return "Checked off by hand when it happens";
    if (m.lowerIsBetter) return m.current != null ? "Best so far " + fmtTime(m.current) + " · need " + fmtTime(m.at) : "Need " + fmtTime(m.at);
    if (m.metric === "band") return fmtNum(Math.min(m.current, m.at)) + " / " + fmtNum(m.at) + " reps (" + m.bandText + " or lighter)";
    if (m.metric === "percent") return fmtPct(m.current) + " / " + fmtNum(m.at) + "%";
    if (m.metric === "weekDays") return "Best week so far: " + fmtNum(Math.min(m.current, m.at)) + " / " + fmtNum(m.at) + " days";
    if (m.metric === "bookDone") return fmtNum(m.current) + " / " + fmtNum(m.at) + " chapters";
    if (m.metric === "distance") return fmtNum(Math.min(m.current, m.at)) + " / " + fmtNum(m.at) + " mi";
    return fmtNum(Math.min(m.current, m.at)) + " / " + fmtNum(m.at);
  }

  function milestonePct(m) {
    if (m.metric === "manual" || !m.at) return null;
    if (m.lowerIsBetter) return null; // time goals: a bar here would be misleading
    return (m.current / m.at) * 100;
  }

  function renderMilestones(root, c, title, compact) {
    if (!c.milestones.length) return;
    var s = compact ? el("div", "challenge-sub") : section(title, "beast-milestones");
    if (compact) s.appendChild(el("h4", null, title));
    else if (c.type === "counter") s.appendChild(el("p", "beast-note", "No prize money here - just glory. And paper towels."));
    else s.appendChild(el("p", "beast-note", "Every milestone unlocks a chunk of the (pretend) prize money. Hit them all and the full prize is yours."));
    var list = el("ul", "milestone-list");

    var nextShown = false;
    c.milestones
      .slice()
      .sort(function (a, b) {
        // Done ones first (in the order they happened), then the rest in JSON order.
        if (a.hitDate && b.hitDate) return a.hitDate < b.hitDate ? -1 : 1;
        if (a.hitDate) return -1;
        if (b.hitDate) return 1;
        return 0;
      })
      .forEach(function (m) {
        var state = m.hitDate ? "done" : (!nextShown && m.metric !== "manual" ? "next" : "locked");
        if (state === "next") nextShown = true;
        var li = el("li", "milestone " + state);
        li.appendChild(el("span", "milestone-icon", m.hitDate ? "🏅" : state === "next" ? "🎯" : "🔒"));
        var body = el("div", "milestone-body");
        body.appendChild(el("p", "milestone-title", m.title));
        if (m.desc) body.appendChild(el("p", "milestone-desc", m.desc));
        var mp = m.hitDate ? null : milestonePct(m);
        if (mp != null) body.appendChild(progressBar(mp, "milestone-track"));
        body.appendChild(el("p", "milestone-meta", milestoneMeta(m)));
        li.appendChild(body);
        li.appendChild(el("span", "milestone-prize", m.reward ? m.reward : "+" + fmtMoney(m.prize)));
        list.appendChild(li);
      });
    s.appendChild(list);
    root.appendChild(s);
  }

  function renderSideQuests(root, quests) {
    if (!quests || !quests.length) return;
    var s = section("Side Quests", "beast-sidequests");
    var grid = el("div", "sidequest-grid");
    quests.forEach(function (q) {
      var type = q.type || "best";
      var built = buildTimeline({ type: type, log: q.log });
      var last = built.timeline[built.timeline.length - 1];
      var value = last ? last.value : 0;
      var target = Number(q.target || 0);
      var pct = target ? (value / target) * 100 : 0;
      var pre = q.prefix || "";
      var unit = q.unit ? " " + q.unit : "";
      function amt(n) { return pre + fmtNum(n) + unit; }

      var card = el("div", "sidequest" + (pct >= 100 ? " done" : "") + (q.milestones && q.milestones.length ? " sidequest-wide" : ""));
      card.appendChild(el("h4", null, (q.emoji ? q.emoji + " " : "") + (pct >= 100 ? "✅ " : "") + q.title));
      if (q.desc) card.appendChild(el("p", "sidequest-desc", q.desc));
      card.appendChild(progressBar(pct));
      card.appendChild(el("p", "sidequest-meta",
        amt(value) + " of " + amt(target) + (type === "best" ? " (best)" : "") +
        (pct >= 100 ? " - DONE!" : " - " + amt(Math.max(0, target - value)) + " to go")));

      // Optional mini milestone ladder for the side quest.
      if (q.milestones && q.milestones.length) {
        var ul = el("ul", "milestone-list sidequest-milestones");
        var nextShown = false;
        q.milestones
          .slice()
          .sort(function (a, b) { return Number(a.value) - Number(b.value); })
          .forEach(function (m) {
            var at = Number(m.value);
            var hit = null;
            for (var i = 0; i < built.timeline.length; i++) {
              if (built.timeline[i].value >= at) { hit = built.timeline[i].date; break; }
            }
            var state = hit ? "done" : (!nextShown ? "next" : "locked");
            if (state === "next") nextShown = true;
            var li = el("li", "milestone " + state);
            li.appendChild(el("span", "milestone-icon", hit ? "🏅" : state === "next" ? "🎯" : "🔒"));
            var body = el("div", "milestone-body");
            body.appendChild(el("p", "milestone-title", m.title));
            if (m.desc) body.appendChild(el("p", "milestone-desc", m.desc));
            body.appendChild(el("p", "milestone-meta", hit ? "Unlocked " + fmtDate(hit) : amt(Math.min(value, at)) + " / " + amt(at)));
            li.appendChild(body);
            li.appendChild(el("span", "milestone-prize", amt(at)));
            ul.appendChild(li);
          });
        card.appendChild(ul);
      }
      grid.appendChild(card);
    });
    s.appendChild(grid);
    root.appendChild(s);
  }

  function renderLog(root, c, title, compact) {
    var s = compact ? el("div", "challenge-sub") : section(title, "beast-log");
    if (compact) s.appendChild(el("h4", null, title));
    if (!c.entries.length) {
      s.appendChild(el("p", "beast-empty", "Nothing logged yet - the first entry is the hardest one. Let's go!"));
      root.appendChild(s);
      return;
    }
    var unitTitle = c.raw.unit ? c.raw.unit.charAt(0).toUpperCase() + c.raw.unit.slice(1) : "Result";
    var cols = c.type === "reading" ? ["Date", "Book", "Page", "Total Pages"]
      : c.type === "total" ? ["Date", "Added", "Running Total", "Note"]
      : c.type === "pullups" ? ["Date", "Band", "Reps", "Note"]
      : c.type === "time" ? ["Date", "Miles", "Time", "Pace", "Note"]
      : c.type === "chapters" ? ["Date", "Read", "New", "Total"]
      : c.type === "weekly" ? ["Date", "Week Of", "Note"]
      : c.type === "counter" ? ["Date", c.raw.unitTitle || "Count", "Note"]
      : ["Date", unitTitle, "Note"];

    var table = el("table", "log-table");
    var thead = el("thead");
    var head = el("tr");
    cols.forEach(function (h) { head.appendChild(el("th", null, h)); });
    thead.appendChild(head);
    table.appendChild(thead);

    var running = 0;
    var rows = c.entries.map(function (e) {
      if (c.type === "reading") {
        var idx = Math.max(1, Math.min(c.books.length, Number(e.book) || 1));
        return [fmtDate(e.date), String(idx), String(e.page || 0), fmtNum(c.cumulativeBefore[idx - 1] + Number(e.page || 0))];
      }
      if (c.type === "total") {
        running += Number(e.value) || 0;
        return [fmtDate(e.date), fmtNum(Number(e.value) || 0), fmtNum(running), e.note || ""];
      }
      if (c.type === "weekly") return [fmtDate(e.date), fmtDate(weekKey(e.date)), e.note || ""];
      if (c.type === "counter") return [fmtDate(e.date), String(e.count != null ? e.count : 1), e.note || ""];
      if (c.type === "chapters") {
        var readText = Array.isArray(e.read) ? e.read.join(", ") : String(e.read || "");
        return [fmtDate(e.date), readText, String(e._new || 0), String(e._total || 0)];
      }
      if (c.type === "pullups") {
        return [fmtDate(e.date), bandLabel(c.bands, e.band), String(Number(e.reps) || 0), e.note || ""];
      }
      if (c.type === "time") {
        var sec = parseTime(e.time);
        var mi = Number(e.miles) || 0;
        return [fmtDate(e.date), fmtNum(mi), fmtTime(sec), sec && mi ? fmtTime(sec / mi) + "/mi" : "-", e.note || ""];
      }
      return [fmtDate(e.date), fmtNum(Number(e.value) || 0), e.note || ""];
    }).reverse(); // newest first

    var tbody = el("tbody");
    rows.forEach(function (cells) {
      var tr = el("tr");
      cells.forEach(function (txt, i) { tr.appendChild(el("td", null, txt)).setAttribute("data-label", cols[i]); });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    var wrap = el("div", "log-wrap");
    wrap.appendChild(table);
    s.appendChild(wrap);
    root.appendChild(s);
  }

  function renderIdeas(root, ideas, title, compact) {
    if (!ideas || !ideas.length) return;
    var s = compact ? el("div", "challenge-sub") : section(title, "beast-ideas");
    if (compact) s.appendChild(el("h4", null, title));
    s.appendChild(el("p", "beast-note", "Still up for discussion - nothing here is official yet."));
    var ul = el("ul", "idea-list");
    ideas.forEach(function (i) { ul.appendChild(el("li", null, i)); });
    s.appendChild(ul);
    root.appendChild(s);
  }

  // ---------- boot ----------
  document.addEventListener("DOMContentLoaded", function () {
    var landing = document.querySelector("[data-beast-landing]");
    if (landing) renderLanding(landing);

    var personRoot = document.querySelector("[data-beast-person]");
    if (personRoot) {
      var id = personRoot.getAttribute("data-beast-person");
      loadPerson(id).then(function (p) {
        renderPerson(personRoot, p);
      }).catch(function (err) {
        console.error("Beast challenge: couldn't load " + id, err);
        personRoot.innerHTML = "";
        personRoot.appendChild(el("p", "beast-empty", "Couldn't load this challenge right now - try refreshing."));
      });
    }
  });
})();
