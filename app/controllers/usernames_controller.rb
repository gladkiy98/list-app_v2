# frozen_string_literal: true

# Usernames Controller
class UsernamesController < ApplicationController
  def show_username
    user = current_user.username
    render json: user
  end
end
