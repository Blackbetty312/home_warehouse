# frozen_string_literal: true

Rails.application.routes.draw do
  resources :items
  resources :translations, only: [:index]
  scope "translations", defaults: { format: :json } do
    put "" => "translations#update"
    patch "" => "translations#update"
  end
  # resources :locales do
  #   , constraints: { :id => /[^\/]+/ }
  # end
  get "i18n/change_lang/:locale" => "application#change_lang", :as => :change_lang
  get "i18n/set_lang/:locale" => "application#set_lang", :as => :set_lang
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  get 'welcome/index'

  root 'welcome#index'
end
