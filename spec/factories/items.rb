# frozen_string_literal: true

FactoryBot.define do
  factory :item do
    content { 'MyString' }
    list_id { 1 }
  end
end
