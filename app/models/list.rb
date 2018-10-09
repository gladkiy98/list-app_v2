# frozen_string_literal: true

# List model
class List < ApplicationRecord
  belongs_to :user
  validates :user_id, presence: true
end
