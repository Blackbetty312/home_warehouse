// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import 'bootstrap/dist/css/bootstrap.css'
import * as bootstrap from 'bootstrap'
// bootstrap;
(() => {
    'use strict'
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
      new bootstrap.Tooltip(tooltipTriggerEl)
    })
  })()