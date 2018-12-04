# frozen_string_literal: true

# create, update & destroy user
class UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      render status: :ok
    else
      render plain: { errors: user.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end
end
