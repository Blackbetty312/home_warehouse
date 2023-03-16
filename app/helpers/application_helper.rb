# frozen_string_literal: true

module ApplicationHelper
    # def default_data_turbo
    #   false
    # end
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

    def flash_toastr
      flash_messages = []
      
      flash.each do |type, message|
        type = 'success' if type == 'notice'
        type = 'error' if type == 'alert' || type == 'danger'
        
        toastr_message = "toastr.#{type}('#{message}', '', {closeButton: true, progressBar: true})"
        
        flash_messages << javascript_tag(toastr_message)
      end
      
      flash_messages.join("\n").html_safe
    end

    def country_flag(locale = nil)
      l = locale || I18n.locale
      case l
      when :pl
        return "flags/4x3/pl.svg"
      when :en
        return "flags/4x3/us.svg"
      end
    end

    def country_name(locale = nil)
      l = locale || I18n.locale
      case l
      when :pl
        return "Polski"
      when :en
        return "English"
      end
    end
    
  end
  
