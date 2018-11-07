# frozen_string_literal: true

# Follows Controller
class FollowsController < ApplicationController
  def index
    render json: current_user.following, status: 200
  end

  def create
    user = User.find(params[:followed_id])
    current_user.follow(user)
    render json: {}, status: 200
  end

  def destroy
    user = User.find(params[:id])
    current_user.unfollow(user)
    render json: {}, status: 200
  end
end
