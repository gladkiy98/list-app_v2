# frozen_string_literal: true

# user model
class User < ApplicationRecord
  has_many :lists, dependent: :destroy
  has_secure_password
  validates_presence_of :username
  validates :username, uniqueness: true
end
