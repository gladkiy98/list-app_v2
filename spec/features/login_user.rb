# frozen_string_literal: true

require 'rails_helper'

describe 'signin & logout', js: true do
  it 'visit homepage & signin' do
    fill_username_password_and_password_confirmation('user1234', 12_345_678, 12_345_678)
    fill_username_and_password('user1234', 12_345_678)
    click_button 'Submit'
    expect(page).to have_content('List App')
    find(:css, '.dropdown').click
    click_button 'Logout'
  end

  it 'all fields are empty' do
    visit_signin
    fill_username_and_password('', '')
    click_button 'Submit'
    expect(page).to have_content('Username cannot be empty')
    expect(page).to have_content('Password cannot be empty')
    expect(page).to have_content('Password is too short (minimum is 8 characters)')
  end

  it 'empty username' do
    visit_signin
    fill_username_and_password('', 12_345_678)
    click_button 'Submit'
    expect(page).to have_content('Username cannot be empty')
  end

  it 'empty username & short password' do
    visit_signin
    fill_username_and_password('', 123)
    click_button 'Submit'
    expect(page).to have_content('Username cannot be empty')
    expect(page).to have_content('Password is too short (minimum is 8 characters)')
  end

  it 'all fields are empty' do
    visit_signin
    fill_username_and_password('', '')
    click_button 'Submit'
    expect(page).to have_content('Username cannot be empty')
    expect(page).to have_content('Password cannot be empty')
    expect(page).to have_content('Password is too short (minimum is 8 characters)')
  end

  it 'visit dashboard without login' do
    visit('http://localhost:4000/dashboard')
    expect(page).not_to have_content('List App')
  end
end
