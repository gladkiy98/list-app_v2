# frozen_string_literal: true

# helper methods for feature specs
module Helpers
  def visit_signup
    visit('http://localhost:4000/signup/')
  end

  def visit_signin
    visit('http://localhost:4000/')
  end

  def fill_username_password_and_password_confirmation(username, password, password_confirmation)
    visit_signup
    fill_in 'username', with: username
    fill_in 'password', with: password
    fill_in 'password_confirmation', with: password_confirmation
    click_button 'Sign up'
  end

  def fill_username_and_password(username, password)
    fill_in 'username', with: username
    fill_in 'password', with: password
  end

  def expect_not_have_content_sign_in
    expect(page).not_to have_content('Sign in')
  end

  def expect_have_content_sign_in
    expect(page).to have_content('Sign in')
  end
end
