# frozen_string_literal: true

# UserLists Controller
class UserlistsController < ApplicationController
  def index
    user = User.find(params[:id])
    render json: user.lists
  end
end
