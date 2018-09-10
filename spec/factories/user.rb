# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    username { 'user123' }
    password { '123456' }
    password_confirmation { '123456' }
  end
end
