// Master Resume filter/rank/search tool.
// Click a category chip to add it to the priority list (click order = rank
// order). Type a custom keyword and press Enter/click Add to add it to that
// same priority list. When priorities are selected, matching bullets stay
// grouped under their role in priority order at the top of the page, and
// every bullet that matches none of your picks — from any role — pools
// together in a single "Everything Else" section at the very bottom,
// rather than just sinking within its own role. A custom keyword matches
// bullet text, job title, and company name. Category tags are hidden by
// default; a "Show Tags" toggle reveals them.

(function () {
  const rankList = []; // ordered list of { type: 'category'|'keyword', value: string }
  let tagsVisible = false;

  function matchesRankItem(bullet, roleEntry, rankItem) {
    if (rankItem.type === "category") {
      return bullet.categories.includes(rankItem.value);
    }
    const needle = rankItem.value.toLowerCase();
    return (
      bullet.text.toLowerCase().includes(needle) ||
      roleEntry.role.toLowerCase().includes(needle) ||
      roleEntry.company.toLowerCase().includes(needle)
    );
  }

  function scoreBullet(bullet, roleEntry) {
    let score = 0;
    let matchedAny = false;
    for (let i = 0; i < rankList.length; i++) {
      const matched = matchesRankItem(bullet, roleEntry, rankList[i]);
      if (matched) matchedAny = true;
      score = score * 2 + (matched ? 0 : 1);
    }
    return { score, matchedAny };
  }

  function renderRankList() {
    const el = document.getElementById("rank-list");
    el.innerHTML = "";
    if (rankList.length === 0) {
      el.innerHTML = '<span class="rank-list-empty">No priorities selected yet \u2014 showing default order.</span>';
      return;
    }
    rankList.forEach((item, i) => {
      const pill = document.createElement("span");
      pill.className = "rank-pill";
      pill.innerHTML = `${i + 1}. ${item.value} <button type="button" aria-label="Remove ${item.value}">\u2715</button>`;
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
      chip.classList.toggle("active", idx !== -1);
      const badge = chip.querySelector(".chip-rank-badge");
      if (idx !== -1) {
        badge.textContent = idx + 1;
        badge.style.display = "inline-flex";
      } else {
        badge.style.display = "none";
      }
    });
  }

  function bulletTagsHtml(bullet) {
    return bullet.categories.map((c) => `<span class="bullet-tag">${c}</span>`).join("");
  }

  function roleHeaderHtml(roleEntry) {
    const logoHtml = roleEntry.logo
      ? `<img src="${roleEntry.logo}" alt="${roleEntry.company} logo" class="company-logo">`
      : "";
    return `
      <div class="resume-role-header">
        ${logoHtml}
        <div>
          <h3>${roleEntry.role}</h3>
          <p class="resume-role-meta">${roleEntry.company}${roleEntry.location ? " \u2014 " + roleEntry.location : ""} &bull; ${formatResumeDateRange(roleEntry.dateRange)}</p>
        </div>
      </div>
    `;
  }

  // Top region: each role, showing only bullets that match at least one
  // selected priority, sorted by tier. A role with zero matches is skipped
  // entirely (its bullets show up in the bottom pool instead).
  function renderTopRoleBlock(roleEntry) {
    const scored = roleEntry.bullets
      .map((b) => ({ bullet: b, ...scoreBullet(b, roleEntry) }))
      .filter((s) => s.matchedAny)
      .sort((a, b) => a.score - b.score);

    if (scored.length === 0) return null;

    const roleBlock = document.createElement("div");
    roleBlock.className = "resume-role-block";
    roleBlock.innerHTML = roleHeaderHtml(roleEntry);

    const ul = document.createElement("ul");
    ul.className = "resume-bullet-list";
    scored.forEach(({ bullet }) => {
      const li = document.createElement("li");
      li.className = "resume-bullet";
      li.innerHTML = `<span class="bullet-text">${bullet.text}</span><span class="bullet-tags">${bulletTagsHtml(bullet)}</span>`;
      ul.appendChild(li);
    });
    roleBlock.appendChild(ul);
    return roleBlock;
  }

  // Default (no priorities selected): render every role normally, no dimming.
  function renderDefaultRoleBlock(roleEntry) {
    const roleBlock = document.createElement("div");
    roleBlock.className = "resume-role-block";
    roleBlock.innerHTML = roleHeaderHtml(roleEntry);

    const ul = document.createElement("ul");
    ul.className = "resume-bullet-list";
    roleEntry.bullets.forEach((bullet) => {
      const li = document.createElement("li");
      li.className = "resume-bullet";
      li.innerHTML = `<span class="bullet-text">${bullet.text}</span><span class="bullet-tags">${bulletTagsHtml(bullet)}</span>`;
      ul.appendChild(li);
    });
    roleBlock.appendChild(ul);
    return roleBlock;
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
      MASTER_RESUME_DATA.filter((r) => r.section === sectionName).forEach((roleEntry) => {
        const block = filtering ? renderTopRoleBlock(roleEntry) : renderDefaultRoleBlock(roleEntry);
        if (block) {
          sectionEl.appendChild(block);
          anyRendered = true;
        }
      });
      if (anyRendered) container.appendChild(sectionEl);
    });

    // Bottom pool: every non-matching bullet from every role, across all
    // sections, gathered into one "Everything Else" area.
    if (filtering) {
      const leftovers = [];
      MASTER_RESUME_DATA.forEach((roleEntry) => {
        roleEntry.bullets.forEach((bullet) => {
          const { matchedAny } = scoreBullet(bullet, roleEntry);
          if (!matchedAny) leftovers.push({ bullet, roleEntry });
        });
      });

      if (leftovers.length > 0) {
        const leftoverSection = document.createElement("div");
        leftoverSection.className = "resume-section resume-leftover-section";
        leftoverSection.innerHTML = `<h2 class="resume-section-title">Everything Else</h2>`;
        const ul = document.createElement("ul");
        ul.className = "resume-bullet-list";
        leftovers.forEach(({ bullet, roleEntry }) => {
          const li = document.createElement("li");
          li.className = "resume-bullet resume-bullet-dim";
          li.innerHTML = `
            <span class="bullet-text">
              ${bullet.text}
              <span class="bullet-source">${roleEntry.role} \u2014 ${roleEntry.company}</span>
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
      chip.addEventListener("click", () => {
        const idx = rankList.findIndex((r) => r.type === "category" && r.value === cat);
        if (idx === -1) {
          rankList.push({ type: "category", value: cat });
        } else {
          rankList.splice(idx, 1);
        }
        renderAll();
      });
      chipContainer.appendChild(chip);
    });

    const keywordInput = document.getElementById("keyword-input");
    const keywordAddBtn = document.getElementById("keyword-add-btn");
    function addKeyword() {
      const val = keywordInput.value.trim();
      if (!val) return;
      rankList.push({ type: "keyword", value: val });
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
      showTagsToggle.textContent = tagsVisible ? "\u2212 Hide Tags" : "+ Show Tags";
      renderResume();
    });

    renderAll();
  });
})();
