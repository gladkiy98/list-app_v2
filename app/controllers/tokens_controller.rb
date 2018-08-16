# frozen_string_literal: true

# create new token
class TokensController < ApplicationController
  def create
    @user = User.find_by(username: params[:username])
    if @user&.authenticate(params[:password])
      render json: {
        jwt: encode_token(id: @user.id, username: @user.username)
      }, status: :ok
    else
      render json: { error: 'Login Unsuccessfull' }, status: :unauthorized
    end
  end

  private

  def encode_token(payload = {})
    exp = 24.hours.from_now
    payload[:exp] = exp.to_i
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end
end
