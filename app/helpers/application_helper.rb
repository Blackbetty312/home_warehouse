# frozen_string_literal: true

module ApplicationHelper
    def react_component_esbuild(name, props = {})
      # Encode props as a JSON string and escape quotes to avoid HTML injection
      props_json = props.to_json.gsub(/"/, '&quot;').html_safe
  
      # Generate a unique ID for the custom element
      id = SecureRandom.uuid
  
      # Define the custom element using esbuild and insert it into the view
      <<~HTML.html_safe
        <div id="#{id}" data-props="#{props_json}"></div>
        <script type="module">
          import React from 'react';
          import ReactDOM from 'react-dom';
          import #{name} from "./components/#{name.underscore}";
  
          const mountPoint = document.getElementById('#{id}');
          customElements.define('#{name}-esbuild', class extends HTMLElement {
            connectedCallback() {
              const props = JSON.parse(this.getAttribute('data-props'));
              ReactDOM.render(<#{name}  />, this);
            }
          });
        </script>
      HTML
    end
  end
  
