# frozen_string_literal: true

# UserLists Controller
class UserlistsController < ApplicationController
  def index
    user = User.find(params[:id])
    lists = user.lists
    render json: lists
  end
end
