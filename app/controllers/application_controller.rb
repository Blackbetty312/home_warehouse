# frozen_string_literal: true

class ApplicationController < ActionController::Base
    before_action :authenticate_user!, :set_locale

    def change_lang
        lang = params[:locale] || :en
        I18n.locale = lang.to_sym
        session[:locale] = lang
        redirect_to root_path
    end
    
    private
    def set_locale
        unless session[:locale]
          default_locale = "pl"
          session[:locale] = default_locale || I18n.default_locale
        end
        session[:locale] = params[:locale] if params[:locale]
        I18n.locale = params[:locale] || session[:locale] || I18n.default_locale
      end
    
end
