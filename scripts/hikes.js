document.addEventListener("DOMContentLoaded", () => {
  const counterEl = document.getElementById("hikes-counter");
  if (!counterEl) return;

  const ANCHOR_DATE = new Date("2026-09-06T00:00:00");
  const dateEls = Array.from(document.querySelectorAll(".hike-date"));

  const count = dateEls.filter((el) => {
    const iso = el.getAttribute("data-date");
    if (!iso) return false;
    const visitDate = new Date(iso + "T00:00:00");
    return !isNaN(visitDate) && visitDate >= ANCHOR_DATE;
  }).length;

  const hikeWord = count === 1 ? "hike" : "hikes";
  counterEl.textContent = `🥾 ${count} ${hikeWord} since September 6, 2026`;
});
