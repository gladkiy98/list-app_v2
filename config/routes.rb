# frozen_string_literal: true

Rails.application.routes.draw do
  # get 'tokens/create'
  # get 'users/create'
  scope '/api' do
    resources :users
    resources :tokens, only: [:create]
  end
end
