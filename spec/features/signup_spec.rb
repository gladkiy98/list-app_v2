# frozen_string_literal: true

require 'rails_helper'

describe 'signup & signin', js: true do
  it 'signup after create user' do
    fill_username_password_and_password_confirmation('newuser', 123_456, 123_456)
    expect_have_content_sign_in
    fill_username_and_password('newuser', 123_456)
    click_button 'Submit'
    expect(page).to have_content('List App')
    find(:css, '.dropdown').click
    click_button 'Logout'
  end

  it 'not valid data in password confirmation field' do
    fill_username_password_and_password_confirmation('newuser', 123_456, 123)
    expect_not_have_content_sign_in
  end

  it 'nil password field' do
    fill_username_password_and_password_confirmation('newuser', '', '')
    expect_not_have_content_sign_in
  end

  it 'nil username field' do
    fill_username_password_and_password_confirmation('', 123_456, 123_456)
    expect_not_have_content_sign_in
  end
end
