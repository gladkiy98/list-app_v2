# frozen_string_literal: true

require 'rails_helper'

describe 'signin & logout', js: true do
  it 'visit homepage & signin' do
    visit('http://localhost:4000/')
    fill_in 'username', with: 'user'
    fill_in 'Password', with: '123456'
    click_button 'Submit'
    expect(page).to have_content('List App')
    find(:css, '.dropdown').click
    click_button 'Logout'
  end

  it 'visit dashboard without login' do
    visit('http://localhost:4000/dashboard')
    expect(page).not_to have_content('List App')
  end
end
