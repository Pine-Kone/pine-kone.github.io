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

  // Search + status filter. Three choices: everything, just what's
  // memorized, or just what's in progress. ("Not Yet Memorized" is
  // deliberately not offered - at book-length scale, filtering to the
  // thousands of verses you haven't started isn't a meaningful view.)
  //
  // The options are defined here rather than in each page's HTML so this
  // one shared file is the single source of truth for the dropdown -
  // adding or renaming a choice updates every scripture page at once,
  // including the multi-megabyte ones that can't be hand-edited in
  // GitHub's web editor. Any options hardcoded in the page are replaced.
  const searchBox = document.getElementById("search");
  const filterSelect = document.getElementById("memorize-filter");

  if (filterSelect) {
    filterSelect.innerHTML =
      '<option value="all">All Verses</option>' +
      '<option value="memorized">Memorized Only</option>' +
      '<option value="in-progress">In Progress Only</option>';
  }

  function applyFilters() {
    const searchTerm = searchBox ? searchBox.value.toLowerCase() : "";
    const filterValue = filterSelect ? filterSelect.value : "all";

    verses.forEach((verse) => {
      const matchesSearch = !searchTerm || verse.textContent.toLowerCase().includes(searchTerm);
      let matchesFilter = true;
      if (filterValue === "memorized") {
        matchesFilter = verse.classList.contains("memorized");
      } else if (filterValue === "in-progress") {
        matchesFilter = verse.classList.contains("in-progress");
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
    const jumpNav = bookJumpList.closest(".jump-nav");

    // The jump-nav is sticky, and its height changes as books/chapters
    // open and close, so a fixed scroll-margin-top (enough for a compact
    // nav like the Pokemon chase-list's species-jump-nav) isn't enough
    // here - a page with many books, or an open chapter list, can make
    // this nav much taller. Track its real height live instead, so a
    // jump target always lands clear of the nav rather than under it.
    function recalcStickyOffset() {
      if (!jumpNav) return;
      const height = jumpNav.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--sticky-nav-offset", height + 16 + "px");
    }

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

    // Only one book's chapter list is open at a time, and it closes
    // itself again once a chapter is actually picked - keeps the nav
    // from turning into a tall wall of pills as you browse around.
    let openBook = null; // { item, btn, chapterList }

    function closeOpenBook() {
      if (!openBook) return;
      openBook.btn.classList.remove("open");
      openBook.chapterList.hidden = true;
      openBook.item.classList.remove("expanded");
      openBook = null;
    }

    function jumpTo(id) {
      const target = document.getElementById(id);
      if (!target) return;
      recalcStickyOffset();
      target.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", "#" + id);
    }

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
          a.addEventListener("click", (e) => {
            e.preventDefault();
            closeOpenBook();
            jumpTo(ch.id);
          });
          chapterList.appendChild(a);
        });
        item.appendChild(chapterList);

        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const wasOpen = openBook && openBook.btn === btn;
          closeOpenBook();
          if (!wasOpen) {
            btn.classList.add("open");
            chapterList.hidden = false;
            item.classList.add("expanded");
            openBook = { item, btn, chapterList };
          }
          jumpTo(book.chapters[0].id);
        });
      } else {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          closeOpenBook();
          jumpTo(book.chapters[0].id);
        });
      }

      bookJumpList.appendChild(item);
    });

    recalcStickyOffset();
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(recalcStickyOffset, 150);
    });
  }
});
