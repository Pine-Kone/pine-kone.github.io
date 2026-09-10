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

  // Search + memorized-only filter. "Not Yet Memorized" was removed as an
  // option - at book-length scale (whole books of scripture) comparing
  // "not yet memorized" against "memorized" isn't a meaningful contrast, so
  // the only choices left are "everything" or "just what's memorized".
  const searchBox = document.getElementById("search");
  const filterSelect = document.getElementById("memorize-filter");

  function applyFilters() {
    const searchTerm = searchBox ? searchBox.value.toLowerCase() : "";
    const filterValue = filterSelect ? filterSelect.value : "all";

    verses.forEach((verse) => {
      const matchesSearch = !searchTerm || verse.textContent.toLowerCase().includes(searchTerm);
      const matchesFilter = filterValue !== "memorized" || verse.classList.contains("memorized");
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

  // ------------------------------------------------------------------
  // Book jump nav (mirrors the Pokemon chase-list's species-jump-nav):
  // built at runtime from the chapter headers already on the page, so
  // none of the huge generated scripture files need per-chapter markup
  // added by hand. Only runs on pages that have the nav container -
  // family-proclamation.html and pi.html have no chapter headers/books
  // and don't include this container, so this is a no-op there.
  // ------------------------------------------------------------------
  const bookJumpList = document.getElementById("book-jump-list");
  if (bookJumpList && headers.length) {
    // A header's text is "{Book Name} {Chapter}" (e.g. "1 Nephi 5",
    // "D&C 12"), or just a book/front-matter name with no chapter number
    // ("Introduction", "Articles of Faith 1" still matches - the trailing
    // token is stripped only when it's purely numeric).
    const books = []; // [{ name, chapters: [{ label, id }] }]
    const byName = {};

    headers.forEach((header, i) => {
      header.id = header.id || "chapter-" + i;
      const text = header.textContent.trim();
      const match = text.match(/^(.*?)\s+(\d+)$/);
      const bookName = match ? match[1] : text;
      const chapterLabel = match ? match[2] : text;

      let book = byName[bookName];
      if (!book) {
        book = { name: bookName, chapters: [] };
        byName[bookName] = book;
        books.push(book);
      }
      book.chapters.push({ label: chapterLabel, id: header.id });
    });

    books.forEach((book) => {
      const item = document.createElement("div");
      item.className = "book-jump-item";

      const btn = document.createElement("a");
      btn.className = "book-jump-book-btn";
      btn.textContent = book.name;
      btn.href = "#" + book.chapters[0].id;

      item.appendChild(btn);

      // A single-chapter "book" (front matter like "Introduction", or a
      // one-chapter work like "Articles of Faith") just jumps - there's
      // nothing to nest.
      if (book.chapters.length > 1) {
        const chapterList = document.createElement("div");
        chapterList.className = "book-jump-chapters";
        chapterList.hidden = true;
        book.chapters.forEach((ch) => {
          const a = document.createElement("a");
          a.href = "#" + ch.id;
          a.textContent = ch.label;
          chapterList.appendChild(a);
        });
        item.appendChild(chapterList);

        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const open = btn.classList.toggle("open");
          chapterList.hidden = !open;
          if (open) {
            document.getElementById(book.chapters[0].id).scrollIntoView({ behavior: "smooth" });
          }
        });
      }

      bookJumpList.appendChild(item);
    });
  }
});
