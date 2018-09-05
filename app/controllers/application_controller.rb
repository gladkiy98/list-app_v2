# frozen_string_literal: true

# application record
class ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection
  protect_from_forgery except: :create
end
