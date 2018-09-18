# frozen_string_literal: true

require 'rails_helper'

describe 'signup & signin', js: true do
  it 'signup after create user' do
    fill_username_password_and_password_confirmation('user12345', 12_345_678, 12_345_678)
    fill_username_and_password('user12345', 12_345_678)
    click_button 'Submit'
    expect(page).to have_content('List App')
    find(:css, '.dropdown').click
    click_button 'Logout'
  end

  it 'not valid data in password confirmation field' do
    fill_username_password_and_password_confirmation('newuser', 12_345_678, 123)
    expect(page).to have_content('Password confirmation must be equal to Password')
  end

  it 'short password' do
    fill_username_password_and_password_confirmation('newuser', 1_234_567, 1_234_567)
    expect(page).to have_content('Password is too short (minimum is 8 characters)')
  end

  it 'nil password field' do
    fill_username_password_and_password_confirmation('newuser', '', '')
    expect(page).to have_content('Password cannot be empty')
    expect(page).to have_content('Password is too short (minimum is 8 characters)')
    expect(page).to have_content('Password confirmation cannot be empty')
  end

  it 'nil username field' do
    fill_username_password_and_password_confirmation('', 12_345_678, 12_345_678)
    expect(page).to have_content('Username cannot be empty')
  end

  it 'all fields are empty' do
    fill_username_password_and_password_confirmation('', '', '')
    expect(page).to have_content('Username cannot be empty')
    expect(page).to have_content('Password cannot be empty')
    expect(page).to have_content('Password is too short (minimum is 8 characters)')
    expect(page).to have_content('Password confirmation cannot be empty')
  end
end
