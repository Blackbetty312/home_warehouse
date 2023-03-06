# frozen_string_literal: true

Rails.application.routes.draw do
  resources :items
  resources :locales do
    resources :translations, constraints: { :id => /[^\/]+/ }
  end
  get "i18n/change_lang/:locale" => "application#change_lang", :as => :change_lang 
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  get 'welcome/index'

  root 'welcome#index'
end
