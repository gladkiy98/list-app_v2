# frozen_string_literal: true

# user model
class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true
end
