# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, js: true do
  it 'visit homepage & signin' do
    name_pass_and_pass_conf('jopa', 12_345_678, 12_345_678)
    fill_username_and_password('jopa', 12_345_678)
    expect(page).to have_content('List App')
    find(:css, '.dropdown').click
    click_button 'Logout'
  end

  it 'all fields are empty' do
    visit_signin
    fill_username_and_password('', '')
    expect(page).to have_content('Username cannot be empty')
  end

  it 'empty username & short password' do
    visit_signin
    fill_username_and_password('', 123)
    expect(page).to have_content('Username cannot be empty')
  end
end
