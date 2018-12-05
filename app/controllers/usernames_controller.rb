# frozen_string_literal: true

# Usernames Controller
class UsernamesController < ApplicationController
  def show_username
    render json: current_user.username
  end
end
