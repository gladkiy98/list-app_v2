# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, js: true do
  it 'signup after create user' do
    name_pass_and_pass_conf('newexample', 12_345_678, 12_345_678)
    fill_username_and_password('newexample', 12_345_678)
    expect(page).to have_content('List App')
    find(:css, '.dropdown').click
    click_button 'Logout'
  end

  it 'not valid data in password confirmation field' do
    name_pass_and_pass_conf('newuser', 12_345_678, 123)
    expect(page).to have_content(
      'Password confirmation must be equal to Password'
    )
  end

  it 'short password' do
    name_pass_and_pass_conf('newuser', 1_234_567, 1_234_567)
    expect(page).to have_content(
      'Password is too short (minimum is 8 characters)'
    )
  end
end
