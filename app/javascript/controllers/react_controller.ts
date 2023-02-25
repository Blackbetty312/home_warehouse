import { Controller } from "@hotwired/stimulus";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "../components/Home/App"

// Connects to data-controller="react"
export default class extends Controller {
  connect() {
    console.log("React controller connected");
    const app = document.getElementById("app");
    if (!app) {
      console.error("element with app id not found")
      return;
    }
    createRoot(app).render(React.createElement<typeof App>(App));
  }
}