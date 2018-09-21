# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    username { Faker::Name.unique.name }
    password { Faker::Internet.password }
    password_confirmation { password }
  end
end
