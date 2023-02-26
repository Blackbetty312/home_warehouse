# frozen_string_literal: true

Rails.application.routes.draw do
  resources :items
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  get 'welcome/index'

  root 'welcome#index'
end
