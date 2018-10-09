# frozen_string_literal: true

# user model
class User < ApplicationRecord
  has_many :lists, dependent: :destroy
  has_secure_password
  validates :username, :password, :password_confirmation, presence: true
  validates :username, uniqueness: true
end
