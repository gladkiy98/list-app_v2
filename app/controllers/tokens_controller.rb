# frozen_string_literal: true

# create new token
class TokensController < ApplicationController
  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      render json: {
        jwt: encode_token(id: user.id, username: user.username)
      }, status: :ok
    else
      render json: { error: 'Login Unsuccessfull' }, status: :unauthorized
    end
  end
end
