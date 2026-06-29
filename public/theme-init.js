(function () {
  try {
    var stored = localStorage.getItem("theme");
    var isDark =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (isDark) document.documentElement.classList.add("dark");
  } catch {
    // Ignore storage/access errors
  }
})();
