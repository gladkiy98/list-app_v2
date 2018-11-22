# frozen_string_literal: true

require 'jwt'

# JWT encode&decode methods
class Auth
  ALGORITHM = 'HS256'

  def self.encode(payload = {})
    exp = 24.hours.from_now
    payload[:exp] = exp.to_i
    JWT.encode(
      payload,
      Rails.application.secrets.secret_key_base,
      ALGORITHM
    )
  end

  def self.decode(token)
    JWT.decode(
      token,
      Rails.application.secrets.secret_key_base,
      true,
      algorithm: ALGORITHM
    ).first
  end
end
