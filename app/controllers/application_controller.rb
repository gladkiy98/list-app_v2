# frozen_string_literal: true

# application record
class ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection
  protect_from_forgery except: :create

  private

  def encode_token(payload = {})
    exp = 24.hours.from_now
    payload[:exp] = exp.to_i
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end
end
