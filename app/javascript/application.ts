// Entry point for the build script in your package.json
import "@hotwired/turbo-rails";
import "./controllers";
import "@fortawesome/fontawesome-free/js/all";
import "./controllers/jquery";
import { bootstrap } from "./controllers/bootstrap";
import * as toastr from "toastr";
import "flowbite/dist/flowbite.turbo.js";
window.toastr = toastr;
(() => {
  "use strict";
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });
})();

$(() => {
  var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

  // Change the icons inside the button based on previous settings
  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    themeToggleLightIcon?.classList.remove("hidden");
  } else {
    themeToggleDarkIcon?.classList.remove("hidden");
  }

  var themeToggleBtn = document.getElementById("theme-toggle");

  themeToggleBtn?.addEventListener("click", function () {
    // toggle icons inside button
    themeToggleDarkIcon?.classList.toggle("hidden");
    themeToggleLightIcon?.classList.toggle("hidden");

    // if set via local storage previously
    if (localStorage.getItem("color-theme")) {
      if (localStorage.getItem("color-theme") === "light") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      }

      // if NOT set via local storage previously
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      }
    }
  });
});
