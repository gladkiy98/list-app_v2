# frozen_string_literal: true

# Username controller
class UsernamesController < ApplicationController
  def index
    render json: current_user.username, status: :ok
  end
end
