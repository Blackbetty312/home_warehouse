import { Application } from "@hotwired/stimulus";

const application = Application.start();

declare global {
  interface Window {
    Stimulus: typeof application;
  }
}

// Configure Stimulus development experience
application.debug = true;
window.Stimulus = application;
export { application };
