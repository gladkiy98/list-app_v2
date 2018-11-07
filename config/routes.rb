# frozen_string_literal: true

Rails.application.routes.draw do
  scope '/api' do
    resources :users
    resources :tokens, only: [:create]
    resources :items
    resources :lists
    resources :userlists
    resources :follows
  end
  get 'api/usernames/:id', to: 'usernames#show_username'
end
