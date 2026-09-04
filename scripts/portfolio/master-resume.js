// Master Resume filter/rank/search tool.
// Click a category chip to add it to the priority list (click order = rank
// order). Click it a second time to switch that category to EXCLUDE: bullets
// carrying it still appear, but rank below their peers instead of above them.
// A third click clears it. Type a custom keyword and press Enter/click Add to add it to that
// same priority list. When priorities are selected, matching bullets stay
// grouped under their employer in priority order at the top of the page, and
// every bullet that matches none of your picks - from any employer - pools
// together in a single "Everything Else" section at the very bottom,
// rather than just sinking within its own employer. A custom keyword matches
// bullet text, every job title held at that employer, and company name.
// Category tags are hidden by default; a "Show Tags" toggle reveals them.
//
// Data shape note: MASTER_RESUME_DATA is one entry per EMPLOYER, each with a
// `roles` array. A bullet with no `roles` key is shared across the whole
// tenure; a bullet with `roles: ["Title"]` renders under that role's
// subheading. See master-resume-data.js for the full contract.

(function () {
  const rankList = []; // ordered list of { type: 'category'|'keyword', value: string }
  let tagsVisible = false;

  function entryRoles(entry) {
    return entry.roles || [];
  }

  function primaryRoleTitle(entry) {
    const roles = entryRoles(entry);
    return roles.length ? roles[0].title : "";
  }

  // Which role name to show beside a bullet in the "Everything Else" pool.
  // A shared bullet at a multi-role employer belongs to the whole tenure, not
  // to the most recent title, so it gets no role label at all.
  function bulletRoleLabel(entry, bullet) {
    if (bullet.roles && bullet.roles.length) return bullet.roles.join(" / ");
    const roles = entryRoles(entry);
    return roles.length === 1 ? roles[0].title : "";
  }

  // True when at least one bullet is scoped to specific roles, which switches
  // the employer block from one flat list to per-role subgroups.
  function hasRoleScopedBullets(entry) {
    return entry.bullets.some((b) => b.roles && b.roles.length);
  }

  function matchesRankItem(bullet, entry, rankItem) {
    if (rankItem.type === "category") {
      return bullet.categories.includes(rankItem.value);
    }
    const needle = rankItem.value.toLowerCase();
    if (bullet.text.toLowerCase().includes(needle)) return true;
    if (entry.company.toLowerCase().includes(needle)) return true;
    return entryRoles(entry).some(
      (r) =>
        r.title.toLowerCase().includes(needle) ||
        (r.altTitle && r.altTitle.toLowerCase().includes(needle))
    );
  }

  // Each priority contributes one bit to the sort key, most significant first,
  // so lower scores sort higher. An INCLUDE priority rewards a match; an
  // EXCLUDE priority penalises one. That keeps excluded bullets visible and
  // ungreyed - they simply fall below peers that don't carry the tag.
  function scoreBullet(bullet, entry) {
    let score = 0;
    let matchedInclude = false;
    let anyInclude = false;
    for (let i = 0; i < rankList.length; i++) {
      const item = rankList[i];
      const matched = matchesRankItem(bullet, entry, item);
      if (item.mode === "exclude") {
        score = score * 2 + (matched ? 1 : 0);
      } else {
        anyInclude = true;
        if (matched) matchedInclude = true;
        score = score * 2 + (matched ? 0 : 1);
      }
    }
    // With only exclusions selected, nothing is being asked for - so everything
    // stays in the main list and the excluded bullets just sink within it.
    return { score, matchedAny: anyInclude ? matchedInclude : true };
  }

  function renderRankList() {
    const el = document.getElementById("rank-list");
    el.innerHTML = "";
    if (rankList.length === 0) {
      el.innerHTML = '<span class="rank-list-empty">No priorities selected yet - showing default order.</span>';
      return;
    }
    rankList.forEach((item, i) => {
      const pill = document.createElement("span");
      pill.className = "rank-pill" + (item.mode === "exclude" ? " rank-pill-exclude" : "");
      const prefix = item.mode === "exclude" ? "−" : `${i + 1}.`;
      pill.innerHTML = `${prefix} ${item.value} <button type="button" aria-label="Remove ${item.value}">✕</button>`;
      pill.querySelector("button").addEventListener("click", () => {
        rankList.splice(i, 1);
        renderAll();
      });
      el.appendChild(pill);
    });
  }

  function renderChips() {
    document.querySelectorAll(".category-chip").forEach((chip) => {
      const value = chip.getAttribute("data-category");
      const idx = rankList.findIndex((r) => r.type === "category" && r.value === value);
      const item = idx === -1 ? null : rankList[idx];
      const excluded = !!item && item.mode === "exclude";
      chip.classList.toggle("active", idx !== -1 && !excluded);
      chip.classList.toggle("excluded", excluded);
      const badge = chip.querySelector(".chip-rank-badge");
      if (idx !== -1) {
        badge.textContent = excluded ? "−" : idx + 1;
        badge.style.display = "inline-flex";
      } else {
        badge.style.display = "none";
      }
    });
  }

  function bulletTagsHtml(bullet) {
    return bullet.categories.map((c) => `<span class="bullet-tag">${c}</span>`).join("");
  }

  // Title and dates share a line, dates pushed right - matching the layout of
  // Hans's actual resume.
  function titleLineHtml(titleHtml, dates, opts) {
    const o = opts || {};
    const tag = o.tag || "div";
    const cls = "resume-title-line" + (o.className ? " " + o.className : "");
    return `<${tag} class="${cls}">
        <span class="resume-title-text">${titleHtml}</span>
        <span class="resume-title-dates">${dates}</span>
      </${tag}>`;
  }

  // Initials for the monogram tile that stands in for a missing logo.
  // Corporate suffixes and joining words are dropped so "Allred Gemco, Inc."
  // reads AG and "S & K Farms" reads SK.
  const MONOGRAM_SKIP = ["the", "at", "of", "and", "a", "&", "inc", "llc", "ltd", "co", "corp", "company"];

  function companyInitials(name) {
    const words = String(name)
      .split(/[\s,]+/)
      .map((w) => w.replace(/[^A-Za-z&]/g, ""))
      .filter((w) => w && MONOGRAM_SKIP.indexOf(w.toLowerCase()) === -1);
    return words.slice(0, 2).map((w) => w.charAt(0).toUpperCase()).join("");
  }

  // One shape for every employer: the company leads with its location pushed
  // right, then each role sits beneath with its dates in the same right-hand
  // column. No overall span on the company line - the roles carry the timeline.
  function employerHeaderHtml(entry) {
    // Every entry reserves the same logo-width column, logo or not, so the
    // company name lines up whether or not that employer has a mark on file.
    let logoHtml = "";
    if (entry.logo) {
      const img = `<img src="${entry.logo}" alt="${entry.company} logo" class="company-logo">`;
      logoHtml = entry.website
        ? `<a href="${entry.website}" target="_blank" rel="noopener" aria-label="${entry.company} website">${img}</a>`
        : img;
    } else {
      // No logo on file: a tinted monogram tile keeps the column filled and the
      // company names aligned. aria-hidden because the name follows it in text.
      logoHtml = `<span class="company-logo company-logo-placeholder" aria-hidden="true">${companyInitials(entry.company)}</span>`;
    }
    const companyHtml = entry.website
      ? `<a href="${entry.website}" target="_blank" rel="noopener" class="company-link">${entry.company}</a>`
      : entry.company;

    return `
      ${logoHtml}
      <div class="resume-employer-body">
        <div class="resume-title-line resume-company-line">
          <h3 class="resume-company-name">${companyHtml}</h3>
          <span class="resume-title-dates resume-location">${entry.location || ""}</span>
        </div>
      </div>
    `;
  }

  // A role heading: title on the left, its dates pushed right.
  function roleHeadingEl(role) {
    const h = document.createElement("h4");
    h.className = "resume-subrole resume-title-line";
    h.innerHTML =
      `<span class="resume-title-text">${formatResumeRoleTitle(role)}</span>` +
      `<span class="resume-title-dates">${formatResumeDateRange(role.dateRange)}</span>`;
    return h;
  }

  function buildBulletList(bullets) {
    const ul = document.createElement("ul");
    ul.className = "resume-bullet-list";
    bullets.forEach((bullet) => {
      const li = document.createElement("li");
      li.className = "resume-bullet";
      li.innerHTML = `<span class="bullet-text">${bullet.text}</span><span class="bullet-tags">${bulletTagsHtml(bullet)}</span>`;
      ul.appendChild(li);
    });
    return ul;
  }

  // Builds one employer block. Every role gets its own heading with its dates;
  // bullets scoped to a role sit under that role's heading, and bullets shared
  // across the whole tenure sit under the stacked headings that share them.
  function buildEmployerBlock(entry, visibleBullets) {
    if (visibleBullets.length === 0) return null;

    const block = document.createElement("div");
    block.className = "resume-role-block";
    block.innerHTML = employerHeaderHtml(entry);
    // Roles and bullets go inside the text column beside the logo, so they line
    // up under the employer name instead of hanging to its left.
    const body = block.querySelector(".resume-employer-body");

    const roles = entryRoles(entry);

    // No bullet is scoped to a role, so every role shares the same list: stack
    // the headings together, then print the bullets once beneath them.
    if (!hasRoleScopedBullets(entry)) {
      roles.forEach((role) => body.appendChild(roleHeadingEl(role)));
      body.appendChild(buildBulletList(visibleBullets));
      return block;
    }

    const shared = visibleBullets.filter((b) => !b.roles || !b.roles.length);
    if (shared.length) body.appendChild(buildBulletList(shared));

    // A bullet renders under only the first matching role heading (roles are
    // listed most-recent-first), so a title that recurs after a promotion
    // doesn't repeat the same bullets under every occurrence.
    const alreadyRendered = new Set();
    roles.forEach((role) => {
      const forRole = visibleBullets.filter((b) => b.roles && b.roles.includes(role.title) && !alreadyRendered.has(b));
    forRole.forEach((b) => alreadyRendered.add(b));
      // While filtering, a role with no surviving bullets is dropped; in the
      // default view an empty role still belongs in the timeline.
      if (!forRole.length && rankList.length) return;
      body.appendChild(roleHeadingEl(role));
      if (forRole.length) body.appendChild(buildBulletList(forRole));
    });

    return block;
  }

  // Top region: each employer, showing only bullets that match at least one
  // selected priority, sorted by tier. An employer with zero matches is
  // skipped entirely (its bullets show up in the bottom pool instead).
  function renderTopEmployerBlock(entry) {
    const scored = entry.bullets
      .map((b) => ({ bullet: b, ...scoreBullet(b, entry) }))
      .filter((s) => s.matchedAny)
      .sort((a, b) => a.score - b.score)
      .map((s) => s.bullet);

    return buildEmployerBlock(entry, scored);
  }

  // Default (no priorities selected): render every employer normally.
  function renderDefaultEmployerBlock(entry) {
    return buildEmployerBlock(entry, entry.bullets);
  }

  function renderResume() {
    const container = document.getElementById("resume-list");
    container.innerHTML = "";
    container.classList.toggle("show-tags", tagsVisible);

    const filtering = rankList.length > 0;
    const sections = [...new Set(MASTER_RESUME_DATA.map((r) => r.section))];

    sections.forEach((sectionName) => {
      const sectionEl = document.createElement("div");
      sectionEl.className = "resume-section";
      sectionEl.innerHTML = `<h2 class="resume-section-title">${sectionName}</h2>`;
      let anyRendered = false;
      MASTER_RESUME_DATA.filter((r) => r.section === sectionName).forEach((entry) => {
        const block = filtering ? renderTopEmployerBlock(entry) : renderDefaultEmployerBlock(entry);
        if (block) {
          sectionEl.appendChild(block);
          anyRendered = true;
        }
      });
      if (anyRendered) container.appendChild(sectionEl);
    });

    // Bottom pool: every non-matching bullet from every employer, across all
    // sections, gathered into one "Everything Else" area.
    if (filtering) {
      const leftovers = [];
      MASTER_RESUME_DATA.forEach((entry) => {
        entry.bullets.forEach((bullet) => {
          const { matchedAny } = scoreBullet(bullet, entry);
          if (!matchedAny) leftovers.push({ bullet, entry });
        });
      });

      if (leftovers.length > 0) {
        const leftoverSection = document.createElement("div");
        leftoverSection.className = "resume-section resume-leftover-section";
        leftoverSection.innerHTML = `<h2 class="resume-section-title">Everything Else</h2>`;
        const ul = document.createElement("ul");
        ul.className = "resume-bullet-list";
        leftovers.forEach(({ bullet, entry }) => {
          const li = document.createElement("li");
          li.className = "resume-bullet resume-bullet-dim";
          li.innerHTML = `
            <span class="bullet-text">
              ${bullet.text}
              <span class="bullet-source">${bulletRoleLabel(entry, bullet) ? bulletRoleLabel(entry, bullet) + " - " : ""}${entry.company}</span>
            </span>
            <span class="bullet-tags">${bulletTagsHtml(bullet)}</span>
          `;
          ul.appendChild(li);
        });
        leftoverSection.appendChild(ul);
        container.appendChild(leftoverSection);
      }
    }

    if (MASTER_RESUME_SKILLS && MASTER_RESUME_SKILLS.length) {
      const skillsSection = document.createElement("div");
      skillsSection.className = "resume-section";
      skillsSection.innerHTML = `
        <h2 class="resume-section-title">Skills &amp; Certifications</h2>
        <ul class="resume-bullet-list resume-skills-list">
          ${MASTER_RESUME_SKILLS.map((s) => `<li class="resume-bullet"><span class="bullet-text">${s}</span></li>`).join("")}
        </ul>
      `;
      container.appendChild(skillsSection);
    }
  }

  function renderAll() {
    renderRankList();
    renderChips();
    renderResume();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const chipContainer = document.getElementById("category-chips");
    MASTER_RESUME_CATEGORIES.forEach((cat) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "category-chip";
      chip.setAttribute("data-category", cat);
      chip.innerHTML = `<span class="chip-rank-badge"></span>${cat}`;
      if (typeof MASTER_RESUME_CATEGORY_DEFINITIONS !== "undefined" && MASTER_RESUME_CATEGORY_DEFINITIONS[cat]) {
        chip.title = MASTER_RESUME_CATEGORY_DEFINITIONS[cat];
      }
      // off -> include -> exclude -> off
      chip.addEventListener("click", () => {
        const idx = rankList.findIndex((r) => r.type === "category" && r.value === cat);
        if (idx === -1) {
          rankList.push({ type: "category", value: cat, mode: "include" });
        } else if (rankList[idx].mode === "include") {
          rankList[idx].mode = "exclude";
        } else {
          rankList.splice(idx, 1);
        }
        renderAll();
      });
      chipContainer.appendChild(chip);
    });

    // Definitions panel - so a visitor knows what each filter actually selects.
    const defsEl = document.getElementById("category-definitions");
    const defsToggle = document.getElementById("definitions-toggle");
    if (defsEl && defsToggle && typeof MASTER_RESUME_CATEGORY_DEFINITIONS !== "undefined") {
      defsEl.innerHTML = MASTER_RESUME_CATEGORIES.map(
        (c) => `<dt>${c}</dt><dd>${MASTER_RESUME_CATEGORY_DEFINITIONS[c] || ""}</dd>`
      ).join("");
      defsToggle.addEventListener("click", () => {
        const showing = !defsEl.hidden;
        defsEl.hidden = showing;
        defsToggle.textContent = showing ? "What do these mean?" : "Hide definitions";
      });
    }

    const keywordInput = document.getElementById("keyword-input");
    const keywordAddBtn = document.getElementById("keyword-add-btn");
    function addKeyword() {
      const val = keywordInput.value.trim();
      if (!val) return;
      rankList.push({ type: "keyword", value: val, mode: "include" });
      keywordInput.value = "";
      renderAll();
    }
    keywordAddBtn.addEventListener("click", addKeyword);
    keywordInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addKeyword();
      }
    });

    document.getElementById("clear-priorities-btn").addEventListener("click", () => {
      rankList.length = 0;
      renderAll();
    });

    const showTagsToggle = document.getElementById("show-tags-toggle");
    showTagsToggle.addEventListener("click", () => {
      tagsVisible = !tagsVisible;
      showTagsToggle.textContent = tagsVisible ? "− Hide Tags" : "+ Show Tags";
      renderResume();
    });

    renderAll();
  });
})();
