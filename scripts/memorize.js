document.addEventListener("DOMContentLoaded", () => {
  // Highlight verses based on their class
  const verses = document.querySelectorAll(".verse");
  let memorizedCount = 0;
  let learningCount = 0;

  verses.forEach(verse => {
    if (verse.classList.contains("memorized")) {
      verse.style.backgroundColor = "#c8f7c5"; // light green
      memorizedCount++;
    } else if (verse.classList.contains("learning")) {
      verse.style.backgroundColor = "#fff3b0"; // light yellow
      learningCount++;
    }
  });

  // Calculate and display progress
  const total = verses.length;
  const percentMemorized = Math.round((memorizedCount / total) * 100);
  const percentLearning = Math.round((learningCount / total) * 100);

  document.getElementById("memorized-progress").style.width = percentMemorized + "%";
  document.getElementById("learning-progress").style.width = percentLearning + "%";
  document.getElementById("memorized-progress").textContent = percentMemorized + "% Memorized";
  document.getElementById("learning-progress").textContent = percentLearning + "% Learning";

  // Search functionality
  const searchBox = document.getElementById("search-box");
  searchBox.addEventListener("input", () => {
    const searchTerm = searchBox.value.toLowerCase();

    verses.forEach(verse => {
      if (verse.textContent.toLowerCase().includes(searchTerm)) {
        verse.style.display = "";
      } else {
        verse.style.display = "none";
      }
    });
  });
});