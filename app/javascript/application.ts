// Entry point for the build script in your package.json
import "@hotwired/turbo-rails";
import "./controllers";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/js/all";
import "bootstrap-social";
import "./controllers/jquery";
import { bootstrap } from "./controllers/bootstrap";
import * as toastr from 'toastr';
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
});