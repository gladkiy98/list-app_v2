# frozen_string_literal: true

# Item model
class Item < ApplicationRecord
  belongs_to :list
  validates :list_id, presence: true
end
