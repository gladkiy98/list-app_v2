# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, js: true do
  it 'all fields are empty' do
    visit_signin
    fill_username_and_password('', '')
    expect(page).to have_content(
      'Password is too short (minimum is 8 characters)'
    )
  end

  it 'empty username & short password' do
    visit_signin
    fill_username_and_password('', 123)
    expect(page).to have_content(
      'Password is too short (minimum is 8 characters)'
    )
  end

  it 'visit dashboard without login' do
    visit('http://localhost:4000/dashboard')
    expect(page).not_to have_content('List App')
  end
end
