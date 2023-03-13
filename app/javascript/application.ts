// Entry point for the build script in your package.json
import "@hotwired/turbo-rails";
import "./controllers";
import "@fortawesome/fontawesome-free/js/all";
import "./controllers/jquery";
import { bootstrap } from "./controllers/bootstrap";
import * as toastr from "toastr";
import "flowbite/dist/flowbite.turbo.js";
window.toastr = toastr;

document.addEventListener("turbo:before-fetch-response", function (e) {
    // catch turbo-rails
  })
