# frozen_string_literal: true

# create new token
class TokensController < ApplicationController
  def create
    user = User.find_by(username: params[:username])
    if user
      user.authenticate(params[:password])
      jwt = Auth.encode(id: user.id)
      render plain: { jwt: jwt }.to_json, status: :ok
    else
      render json: { error: 'Login Unsuccessfull' }, status: :unauthorized
    end
  end
end
