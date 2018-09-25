# frozen_string_literal: true

# create, update & destroy user
class UsersController < ApplicationController
  def index
    @user = current_user.username
    render json: @user
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: { message: 'User created successfully' },
             status: :ok
    else
      render json: { errors: user.errors.full_messages },
             status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end
end
