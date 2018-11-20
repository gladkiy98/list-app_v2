# frozen_string_literal: true

# user model
class User < ApplicationRecord
  has_many :lists, dependent: :destroy

  has_many :friends, class_name: 'Follow', foreign_key: 'follower_id', dependent: :destroy

  has_many :following, through: :friends, source: :followed
  has_many :followers, through: :passive_friend, source: :follower

  has_secure_password
  validates_presence_of :username
  validates :username, uniqueness: true

  def follow(user)
    friends.create(followed_id: user.id)
  end

  def unfollow(user)
    friends.find_by(followed_id: user.id).destroy
  end

  def following?(user)
    following.include?(user)
  end
end
