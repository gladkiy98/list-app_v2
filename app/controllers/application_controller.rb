# frozen_string_literal: true

# application record
class ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection
  protect_from_forgery except: :create

  private

  def current_user
    auth_header = request.headers['Authorization']
    token = auth_header
    jwt_payload = Auth.decode(token)
    current_user_id = jwt_payload['id']
    @current_user ||= User.find(current_user_id)
  end
end
