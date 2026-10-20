// Haroldsen Beast Challenges - one script for the landing page and every
// challenger page. All numbers come from /files/beast-challenge/<person>.json.
//
// Landing page:   <main data-beast-landing>
// Challenger page: <main data-beast-person="lucy">
//
// ---------- How to log progress (edit the person's JSON file) ----------
// Reading challenge ("type": "reading") - log where you are, not pages read:
//   { "date": "YYYY-MM-DD", "book": 2, "page": 145 }
//   = "on this date Lucy was on page 145 of Book 2". Finished a book? Log its
//   last page (or page 0 of the next book).
// Best-effort challenge ("type": "best") - log the best set of the session:
//   { "date": "YYYY-MM-DD", "value": 3, "note": "after school" }
// Running-total challenge ("type": "total") - log each chunk, they add up:
//   { "date": "YYYY-MM-DD", "value": 11.8 }
//
// ---------- Milestones ----------
// Each milestone needs a "title", "desc", and "prize" (pretend dollars),
// plus ONE of these triggers:
//   "pages": 1000   (reading) total pages read
//   "book": 3       (reading) finished that book
//   "value": 5      (best/total) reached that number
//   "percent": 50   percent of the main goal
//   "streak": 7     logged this many days in a row
//   "sessions": 10  logged this many separate days
//   "done": "YYYY-MM-DD"  anything else - set the date by hand when it happens
//
// ---------- Side quests ----------
// "sideQuests": [ { "title": "Plank", "type": "best", "unit": "seconds",
//                   "target": 120, "log": [ { "date": "...", "value": 45 } ] } ]

(function () {
  var DATA_DIR = "/files/beast-challenge/";
  var PEOPLE = ["lucy", "fletcher", "hans"];
  var DAY_MS = 86400000;

  // ---------- small helpers ----------
  function parseDate(iso) {
    if (!iso) return null;
    var p = String(iso).split("-");
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  function today() {
    var n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  }

  function daysBetween(a, b) {
    return Math.round((b - a) / DAY_MS);
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
    return (p >= 100 ? 100 : Math.floor(p * 10) / 10) + "%";
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined && text !== null) e.textContent = text;
    return e;
  }

  function progressBar(pct, extraClass) {
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

  function loadPerson(id) {
    return fetch(DATA_DIR + id + ".json", { cache: "no-cache" }).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    }).then(function (data) {
      data.id = id;
      return analyze(data);
    });
  }

  // ---------- the math ----------

  // Turns a challenge's log into a list of day-by-day states:
  //   { date, value, sessions, streak }
  function buildTimeline(type, log, books) {
    var entries = (log || [])
      .filter(function (e) { return e && e.date; })
      .slice()
      .sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });

    var cumulativeBefore = [0];
    (books || []).forEach(function (b, i) {
      cumulativeBefore[i + 1] = cumulativeBefore[i] + Number(b.pages || 0);
    });

    var timeline = [];
    var value = 0;
    var sessions = 0;
    var streak = 0;
    var prevDate = null;

    entries.forEach(function (e) {
      var v;
      if (type === "reading") {
        var bookIdx = Math.max(1, Math.min(books.length, Number(e.book) || 1));
        v = cumulativeBefore[bookIdx - 1] + Math.min(Number(e.page) || 0, Number(books[bookIdx - 1].pages));
        value = Math.max(value, v); // never go backwards if a re-read gets logged
      } else if (type === "total") {
        value += Number(e.value) || 0;
      } else {
        value = Math.max(value, Number(e.value) || 0);
      }

      if (e.date !== prevDate) {
        sessions++;
        var gap = prevDate ? daysBetween(parseDate(prevDate), parseDate(e.date)) : null;
        streak = gap === 1 ? streak + 1 : 1;
        prevDate = e.date;
        timeline.push({ date: e.date, value: value, sessions: sessions, streak: streak });
      } else {
        var last = timeline[timeline.length - 1];
        last.value = value;
      }
    });

    return { timeline: timeline, cumulativeBefore: cumulativeBefore, entries: entries };
  }

  function milestoneTrigger(m, target, cumulativeBefore) {
    if (m.pages != null) return { metric: "value", at: Number(m.pages) };
    if (m.value != null) return { metric: "value", at: Number(m.value) };
    if (m.book != null) return { metric: "value", at: cumulativeBefore[Number(m.book)] };
    if (m.percent != null) return { metric: "value", at: target * Number(m.percent) / 100 };
    if (m.streak != null) return { metric: "streak", at: Number(m.streak) };
    if (m.sessions != null) return { metric: "sessions", at: Number(m.sessions) };
    return { metric: "manual" };
  }

  function analyze(d) {
    var type = d.type || "tbd";
    var books = d.books || [];
    var built = buildTimeline(type, d.log, books);
    var target = type === "reading" ? built.cumulativeBefore[books.length] : Number(d.target || 0);
    var last = built.timeline[built.timeline.length - 1];
    var value = last ? last.value : 0;
    var pct = target > 0 ? (value / target) * 100 : 0;

    var t = today();
    var start = parseDate(d.start) || t;
    var deadline = parseDate(d.deadline) || new Date(t.getFullYear(), 11, 31);
    var daysLeft = Math.max(0, daysBetween(t, deadline) + 1); // includes today
    var spanDays = Math.max(1, daysBetween(start, deadline) + 1);
    var elapsedDays = Math.min(spanDays, Math.max(0, daysBetween(start, t)));

    // Current streak only counts if the last log was today or yesterday.
    var currentStreak = 0;
    if (last && daysBetween(parseDate(last.date), t) <= 1) currentStreak = last.streak;
    var bestStreak = built.timeline.reduce(function (m, s) { return Math.max(m, s.streak); }, 0);

    var milestones = (d.milestones || []).map(function (m) {
      var trig = milestoneTrigger(m, target, built.cumulativeBefore);
      var hitDate = null;
      if (trig.metric === "manual") {
        hitDate = m.done || null;
      } else {
        for (var i = 0; i < built.timeline.length; i++) {
          if (built.timeline[i][trig.metric] >= trig.at) { hitDate = built.timeline[i].date; break; }
        }
      }
      var current = trig.metric === "value" ? value
        : trig.metric === "streak" ? currentStreak
        : trig.metric === "sessions" ? (last ? last.sessions : 0) : 0;
      return {
        title: m.title, desc: m.desc, prize: Number(m.prize || 0),
        metric: trig.metric, at: trig.at, current: current, hitDate: hitDate,
      };
    });

    var prizeTotal = milestones.reduce(function (s, m) { return s + m.prize; }, 0);
    var prizeWon = milestones.reduce(function (s, m) { return s + (m.hitDate ? m.prize : 0); }, 0);
    var nextMilestone = milestones
      .filter(function (m) { return !m.hitDate && m.metric === "value"; })
      .sort(function (a, b) { return a.at - b.at; })[0] || null;

    return {
      raw: d, type: type, books: books, entries: built.entries, timeline: built.timeline,
      cumulativeBefore: built.cumulativeBefore, target: target, value: value, pct: pct,
      complete: target > 0 && value >= target,
      daysLeft: daysLeft, spanDays: spanDays, elapsedDays: elapsedDays,
      expected: target * (elapsedDays / spanDays),
      currentStreak: currentStreak, bestStreak: bestStreak,
      sessions: last ? last.sessions : 0,
      milestones: milestones, prizeTotal: prizeTotal, prizeWon: prizeWon,
      nextMilestone: nextMilestone, deadline: deadline,
    };
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
        var card = el("a", "challenger-card");
        card.href = "/hobby/beast-challenge/" + p.raw.id + "/";
        card.appendChild(el("span", "challenger-emoji", p.raw.emoji || "⭐"));
        card.appendChild(el("h4", "challenger-name", p.raw.name));
        card.appendChild(el("p", "challenger-goal", p.raw.title));

        if (p.type === "tbd") {
          card.appendChild(el("p", "challenger-status", "Challenge being decided - stay tuned!"));
        } else {
          card.appendChild(progressBar(p.pct));
          card.appendChild(el("p", "challenger-status",
            fmtNum(p.value) + " / " + fmtNum(p.target) + " " + (p.raw.unit || "") + " · " + fmtPct(p.pct)));
          card.appendChild(el("p", "challenger-prize", fmtMoney(p.prizeWon) + " of " + fmtMoney(p.prizeTotal) + " unlocked"));
          if (p.complete) {
            card.classList.add("is-complete");
            card.appendChild(el("p", "challenger-next", "🏆 CHALLENGE COMPLETE!"));
          } else if (p.nextMilestone) {
            card.appendChild(el("p", "challenger-next", "Next up: " + p.nextMilestone.title));
          }
        }
        card.appendChild(el("span", "challenger-link", "See " + p.raw.name + "'s page →"));
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
    s.appendChild(el("h3", null, title));
    return s;
  }

  function renderPerson(root, p) {
    var d = p.raw;
    document.title = d.name + "'s Challenge | Hans M. Haroldsen";
    root.innerHTML = "";

    // Hero
    var hero = el("section", "hero beast-hero");
    hero.appendChild(el("p", "beast-kicker", d.name + "'s Challenge"));
    hero.appendChild(el("h2", null, (d.emoji ? d.emoji + " " : "") + d.title));
    if (d.blurb) hero.appendChild(el("p", "hero-blurb", d.blurb));
    hero.appendChild(el("p", "beast-deadline",
      "Deadline: " + fmtDate(d.deadline) + " · " + p.daysLeft + (p.daysLeft === 1 ? " day" : " days") + " left"));
    root.appendChild(hero);

    if (p.type === "tbd") {
      var tbd = section("Coming Soon", "beast-tbd");
      tbd.appendChild(el("p", null, "This challenge hasn't been locked in yet. Once it's picked, the tracker, milestones, and prize ladder will show up right here."));
      root.appendChild(tbd);
      renderIdeas(root, d.ideas, "Challenge Ideas on the Table");
      return;
    }

    // Big progress
    var big = el("section", "beast-progress");
    var pctText = el("p", "beast-percent", fmtPct(p.pct));
    big.appendChild(pctText);
    big.appendChild(progressBar(p.pct, "beast-track"));
    big.appendChild(el("p", "beast-progress-detail",
      fmtNum(p.value) + " of " + fmtNum(p.target) + " " + (d.unit || "") +
      (p.complete ? " - DONE! 🏆" : " - " + fmtNum(p.target - p.value) + " to go")));
    if (p.complete) big.classList.add("is-complete");
    root.appendChild(big);

    // Stat tiles
    var stats = el("section", "beast-stats");
    stats.appendChild(statTile("Prize Unlocked", fmtMoney(p.prizeWon), "of " + fmtMoney(p.prizeTotal) + " (pretend)", true));
    if (p.type === "reading" || p.type === "total") {
      var remaining = Math.max(0, p.target - p.value);
      var perDay = p.daysLeft > 0 ? remaining / p.daysLeft : remaining;
      stats.appendChild(statTile("Needed Per Day", p.complete ? "0" : fmtNum(Math.ceil(perDay * 10) / 10),
        (d.unit || "") + " a day to finish on time"));
      var diff = p.value - p.expected;
      var paceLabel = p.complete ? "Finished!" : Math.abs(diff) < 1 ? "Right on pace" :
        diff > 0 ? fmtNum(diff) + " ahead" : fmtNum(-diff) + " behind";
      stats.appendChild(statTile("Pace Check", paceLabel, "vs. an even pace from " + fmtDate(d.start)));
    } else {
      stats.appendChild(statTile("Personal Best", fmtNum(p.value), (d.unit || "") + " in one set"));
      stats.appendChild(statTile("Practice Days", String(p.sessions), p.sessions === 1 ? "session logged" : "sessions logged"));
    }
    stats.appendChild(statTile("Current Streak", String(p.currentStreak),
      "days in a row · best " + p.bestStreak));
    root.appendChild(stats);

    if (p.type === "reading") renderBookshelf(root, p);
    renderMilestones(root, p);
    renderSideQuests(root, d.sideQuests);
    renderLog(root, p);
    renderIdeas(root, d.ideas, "Idea Board");
  }

  function renderBookshelf(root, p) {
    var s = section("The Bookshelf", "beast-bookshelf");
    var list = el("ol", "book-list");
    p.books.forEach(function (b, i) {
      var startAt = p.cumulativeBefore[i];
      var read = Math.max(0, Math.min(Number(b.pages), p.value - startAt));
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

  function renderMilestones(root, p) {
    if (!p.milestones.length) return;
    var s = section("Milestones & Prize Ladder", "beast-milestones");
    s.appendChild(el("p", "beast-note", "Every milestone unlocks a chunk of the (pretend) prize money. Hit them all and the full prize is yours."));
    var list = el("ul", "milestone-list");

    var nextShown = false;
    p.milestones
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
        body.appendChild(el("p", "milestone-desc", m.desc));
        if (m.hitDate) {
          body.appendChild(el("p", "milestone-meta", "Unlocked " + fmtDate(m.hitDate)));
        } else if (m.metric !== "manual" && m.at > 0) {
          body.appendChild(progressBar((m.current / m.at) * 100, "milestone-track"));
          body.appendChild(el("p", "milestone-meta", fmtNum(Math.min(m.current, m.at)) + " / " + fmtNum(m.at)));
        } else {
          body.appendChild(el("p", "milestone-meta", "Checked off by hand when it happens"));
        }
        li.appendChild(body);
        li.appendChild(el("span", "milestone-prize", "+" + fmtMoney(m.prize)));
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
      var built = buildTimeline(type, q.log, []);
      var last = built.timeline[built.timeline.length - 1];
      var value = last ? last.value : 0;
      var target = Number(q.target || 0);
      var pct = target ? (value / target) * 100 : 0;
      var card = el("div", "sidequest" + (pct >= 100 ? " done" : ""));
      card.appendChild(el("h4", null, (pct >= 100 ? "✅ " : "") + q.title));
      if (q.desc) card.appendChild(el("p", "sidequest-desc", q.desc));
      card.appendChild(progressBar(pct));
      card.appendChild(el("p", "sidequest-meta",
        fmtNum(value) + " / " + fmtNum(target) + " " + (q.unit || "") + (type === "best" ? " (best)" : "")));
      grid.appendChild(card);
    });
    s.appendChild(grid);
    root.appendChild(s);
  }

  function renderLog(root, p) {
    var s = section("Progress Log", "beast-log");
    if (!p.entries.length) {
      s.appendChild(el("p", "beast-empty", "Nothing logged yet - the first entry is the hardest one. Let's go!"));
      root.appendChild(s);
      return;
    }
    var table = el("table", "log-table");
    var head = el("tr");
    var cols = p.type === "reading" ? ["Date", "Book", "Page", "Total Pages"]
      : p.type === "total" ? ["Date", "Added", "Running Total", "Note"]
      : ["Date", p.raw.unit ? p.raw.unit.charAt(0).toUpperCase() + p.raw.unit.slice(1) : "Result", "Note"];
    cols.forEach(function (c) { head.appendChild(el("th", null, c)); });
    var thead = el("thead");
    thead.appendChild(head);
    table.appendChild(thead);

    var tbody = el("tbody");
    var running = 0;
    var rows = p.entries.map(function (e) {
      var cells;
      if (p.type === "reading") {
        var idx = Math.max(1, Math.min(p.books.length, Number(e.book) || 1));
        var tot = p.cumulativeBefore[idx - 1] + Number(e.page || 0);
        cells = [fmtDate(e.date), String(idx), String(e.page || 0), fmtNum(tot)];
      } else if (p.type === "total") {
        running += Number(e.value) || 0;
        cells = [fmtDate(e.date), fmtNum(Number(e.value) || 0), fmtNum(running), e.note || ""];
      } else {
        cells = [fmtDate(e.date), fmtNum(Number(e.value) || 0), e.note || ""];
      }
      return cells;
    }).reverse(); // newest first

    rows.forEach(function (cells) {
      var tr = el("tr");
      cells.forEach(function (c, i) { tr.appendChild(el("td", null, c)).setAttribute("data-label", cols[i]); });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    var wrap = el("div", "log-wrap");
    wrap.appendChild(table);
    s.appendChild(wrap);
    root.appendChild(s);
  }

  function renderIdeas(root, ideas, title) {
    if (!ideas || !ideas.length) return;
    var s = section(title, "beast-ideas");
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
