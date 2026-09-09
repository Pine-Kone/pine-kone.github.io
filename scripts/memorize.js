document.addEventListener("DOMContentLoaded", () => {
  const scripture = document.getElementById("scripture-text");
  if (!scripture) return;

  const verses = Array.from(scripture.querySelectorAll(".verse"));
  const headers = Array.from(scripture.querySelectorAll(".chapter-header"));

  // Tally up progress
  let memorizedCount = 0;
  let inProgressCount = 0;

  verses.forEach((verse) => {
    if (verse.classList.contains("memorized")) {
      memorizedCount++;
    } else if (verse.classList.contains("in-progress")) {
      inProgressCount++;
    }
  });

  const total = verses.length;
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");

  if (progressBar && progressText && total > 0) {
    const percentMemorized = Math.round((memorizedCount / total) * 100);
    progressBar.style.width = percentMemorized + "%";
    progressText.textContent =
      percentMemorized + "% memorized (" + memorizedCount + " of " + total +
      " verses)" + (inProgressCount > 0 ? ", " + inProgressCount + " in progress" : "") + ".";
  }

  // Search + memorized-only filter
  const searchBox = document.getElementById("search");
  const filterSelect = document.getElementById("memorize-filter");

  function applyFilters() {
    const searchTerm = searchBox ? searchBox.value.toLowerCase() : "";
    const filterValue = filterSelect ? filterSelect.value : "all";

    verses.forEach((verse) => {
      const matchesSearch = !searchTerm || verse.textContent.toLowerCase().includes(searchTerm);
      let matchesFilter = true;
      if (filterValue === "memorized") {
        matchesFilter = verse.classList.contains("memorized");
      } else if (filterValue === "not-memorized") {
        matchesFilter = !verse.classList.contains("memorized");
      }
      verse.style.display = matchesSearch && matchesFilter ? "" : "none";
    });

    // A chapter header stays visible only if at least one verse under it
    // (before the next header) is still visible.
    headers.forEach((header) => {
      let node = header.nextElementSibling;
      let hasVisible = false;
      while (node && !node.classList.contains("chapter-header")) {
        if (node.classList.contains("verse") && node.style.display !== "none") {
          hasVisible = true;
          break;
        }
        node = node.nextElementSibling;
      }
      header.style.display = hasVisible ? "" : "none";
    });
  }

  if (searchBox) searchBox.addEventListener("input", applyFilters);
  if (filterSelect) filterSelect.addEventListener("change", applyFilters);

  applyFilters();
});
