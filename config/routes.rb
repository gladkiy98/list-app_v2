# frozen_string_literal: true

Rails.application.routes.draw do
  scope '/api' do
    resources :users
    resources :tokens, only: [:create]
    resources :items
    resources :lists
  end

  get 'api/usernames/', to: 'usernames#index'
end
