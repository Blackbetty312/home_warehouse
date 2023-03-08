import { Controller } from "@hotwired/stimulus";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "../components/Translation/App";

// Connects to data-controller="react"
export default class extends Controller {
  get props() {
    return JSON.parse(this.data.get("props") || "{}");
  }
  connect() {
    console.log("Translation controller connected !");
    const app = document.getElementById("app");
    if (!app) {
      console.error("element with app id not found")
      return;
    }
    createRoot(app).render(React.createElement<any>(App, this.props));
  }
}