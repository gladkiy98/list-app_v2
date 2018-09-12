# frozen_string_literal: true

require 'rails_helper'

describe 'signin & logout', js: true do
  it 'visit homepage & signin' do
    visit_signup
    fill_username_and_password('username', 123_456)
    click_button 'Submit'
    expect(page).to have_content('List App')
    find(:css, '.dropdown').click
    click_button 'Logout'
  end

  it 'visit dashboard without login' do
    visit_signup
    expect(page).not_to have_content('List App')
  end
end
