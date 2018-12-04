# frozen_string_literal: true

# Helper for login user and create token
module RequestSpecHelper
  def login_user(user)
    post '/api/tokens', params: {
      'username': user.username,
      'password': user.password,
    }
    token = JSON.parse(response.body)
    { 'Authorization': (token['jwt']).to_s }
  end
end
