(function () {
  try {
    var now = new Date();
    var month = now.getMonth();
    var hour = now.getHours();
    var season = "spring";
    if (month >= 2 && month <= 4) season = "spring";
    else if (month >= 5 && month <= 7) season = "summer";
    else if (month >= 8 && month <= 10) season = "autumn";
    else season = "winter";
    var time = "morning";
    if (hour >= 0 && hour < 5) time = "night-00";
    else if (hour >= 5 && hour < 7) time = "dawn";
    else if (hour >= 7 && hour < 11) time = "morning";
    else if (hour >= 11 && hour < 14) time = "noon";
    else if (hour >= 14 && hour < 17) time = "afternoon";
    else if (hour >= 17 && hour < 19) time = "dusk";
    else time = "evening";
    document.documentElement.setAttribute("data-season", season);
    document.documentElement.setAttribute("data-time", time);

    var storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    var storedLocale = localStorage.getItem("locale");
    if (storedLocale === "jp" || storedLocale === "en") {
      document.documentElement.setAttribute("data-locale", storedLocale);
      document.documentElement.lang = storedLocale === "jp" ? "ja" : "en";
    } else {
      document.documentElement.setAttribute("data-locale", "en");
    }
    var link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.href = "/favicons/" + season + "@2x.svg";
    document.head.appendChild(link);
  } catch {}
})();
