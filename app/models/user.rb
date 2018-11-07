# frozen_string_literal: true

# user model
class User < ApplicationRecord
  has_many :lists, dependent: :destroy

  has_many :active_friend, class_name: 'Follow', foreign_key: 'follower_id', dependent: :destroy
  has_many :passive_friend, class_name: 'Follow', foreign_key: 'followed_id', dependent: :destroy

  has_many :following, through: :active_friend, source: :followed
  has_many :followers, through: :passive_friend, source: :follower

  has_secure_password
  validates_presence_of :username
  validates :username, uniqueness: true

  def follow(user)
    active_friend.create(followed_id: user.id)
  end

  def unfollow(user)
    active_friend.find_by(followed_id: user.id).destroy
  end

  def following?(user)
    following.include?(user)
  end
end
