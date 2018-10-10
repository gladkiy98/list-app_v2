# frozen_string_literal: true

# Username controller
class UsernamesController < ApplicationController
  def show_username
    user = current_user.username
    render json: user
  end
end
