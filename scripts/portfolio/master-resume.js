// Master Resume filter/rank/search tool.
// Click a category chip to add it to the priority list (click order = rank
// order). Type a custom keyword and press Enter/click Add to add it to that
// same priority list. Bullets re-sort live: matches your #1 priority first,
// then #2, etc. Bullets matching none of your picks sink to the bottom and
// are shown grayed out rather than hidden. A custom keyword matches bullet
// text, job title, and company name (case-insensitive).

(function () {
  const rankList = []; // ordered list of { type: 'category'|'keyword', value: string }

  function matchesRankItem(bullet, roleEntry, rankItem) {
    if (rankItem.type === "category") {
      return bullet.categories.includes(rankItem.value);
    }
    // custom keyword: match bullet text, role title, or company
    const needle = rankItem.value.toLowerCase();
    return (
      bullet.text.toLowerCase().includes(needle) ||
      roleEntry.role.toLowerCase().includes(needle) ||
      roleEntry.company.toLowerCase().includes(needle)
    );
  }

  function scoreBullet(bullet, roleEntry) {
    // Lower score sorts first. Each rank position contributes 0 (match) or 1
    // (no match), most significant first -> lexicographic priority sort.
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

  function renderResume() {
    const container = document.getElementById("resume-list");
    container.innerHTML = "";

    MASTER_RESUME_DATA.forEach((roleEntry) => {
      const scored = roleEntry.bullets.map((b) => ({
        bullet: b,
        ...scoreBullet(b, roleEntry),
      }));

      if (rankList.length > 0) {
        scored.sort((a, b) => a.score - b.score);
      }

      const roleBlock = document.createElement("div");
      roleBlock.className = "resume-role-block";
      roleBlock.innerHTML = `
        <div class="resume-role-header">
          <h3>${roleEntry.role}</h3>
          <p class="resume-role-meta">${roleEntry.company} \u2014 ${roleEntry.location} &bull; ${roleEntry.dateRange}</p>
        </div>
      `;

      const ul = document.createElement("ul");
      ul.className = "resume-bullet-list";

      scored.forEach(({ bullet, matchedAny }) => {
        const li = document.createElement("li");
        li.className = "resume-bullet";
        if (rankList.length > 0 && !matchedAny) {
          li.classList.add("resume-bullet-dim");
        }
        const tags = bullet.categories
          .map((c) => `<span class="bullet-tag">${c}</span>`)
          .join("");
        li.innerHTML = `<span class="bullet-text">${bullet.text}</span><span class="bullet-tags">${tags}</span>`;
        ul.appendChild(li);
      });

      roleBlock.appendChild(ul);
      container.appendChild(roleBlock);
    });
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

    renderAll();
  });
})();
