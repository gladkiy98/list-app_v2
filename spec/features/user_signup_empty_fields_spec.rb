# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, js: true do
  it 'nil password field' do
    name_pass_and_pass_conf('newuser', '', '')
    expect(page).to have_content(
      'Password cannot be empty',
      'Password is too short (minimum is 8 characters)'
    )
  end

  it 'nil password field 2' do
    name_pass_and_pass_conf('newuser', '', '')
    expect(page).to have_content(
      'Password confirmation cannot be empty'
    )
  end

  it 'nil username field' do
    name_pass_and_pass_conf('', 12_345_678, 12_345_678)
    expect(page).to have_content('Username cannot be empty')
  end

  it 'all fields are empty' do
    name_pass_and_pass_conf('', '', '')
    expect(page).to have_content(
      'Username cannot be empty',
      'Password cannot be empty'
    )
  end
end
