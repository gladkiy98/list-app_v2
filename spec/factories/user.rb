# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    username { Faker::Name.unique.name }
    password { '12345678' }
    password_confirmation { '12345678' }
  end
end
