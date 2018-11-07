# frozen_string_literal: true

# Follows Controller
class FollowsController < ApplicationController
  def index
    following = current_user.following
    render json: following
  end

  def create
    user = User.find(params[:followed_id])
    current_user.follow(user)
    current_user.follow_id.push(7)
    render json: { status: 200 }
  end

  def destroy
    user = User.find(params[:id])
    current_user.unfollow(user)
    render json: { status: 200 }
  end
end
