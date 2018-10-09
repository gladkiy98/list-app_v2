# frozen_string_literal: true

# application record
class ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection
  protect_from_forgery except: :create

  private

  def user_id
    token = request.headers['Authorization']
    jwt_payload = Auth.decode(token)
    jwt_payload['id']
  end

  def current_user
    @current_user ||= User.find(user_id)
  end
end
