class TranslationsController < ApplicationController
    before_action :find_translation_update, only: [:update]
  
    def index
      @source_locale = params[:source_locale] || "pl"
      @target_locale = params[:target_locale] || "en"
      @target = Translation.locale(@target_locale)
      @translations = Translation.locale(@source_locale)
    end
  
    def update
      if @translation.update(translation_params)
        I18n.backend.reload!
        render json: {status: :success }
      else
        render json: {status: :error, error: @translation.errors }
      end
    end
  
    private

    def find_translation_update
      @translation = Translation.where(key: translation_params[:key], locale: translation_params[:locale]).first_or_initialize
    end
  
    def translation_params
      params.require(:i18n_backend_active_record_translation).permit(:locale,
        :key, :value)
    end
  end