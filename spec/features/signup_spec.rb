# frozen_string_literal: true

require 'rails_helper'

describe 'signup & signin', js: true do
  it 'signup after create user' do
    visit('http://localhost:4000/signup/')
    fill_in 'username', with: 'newuser'
    fill_in 'password', with: '123456'
    fill_in 'password_confirmation', with: '123456'
    click_button 'Sign up'
    expect(page).to have_content('Sign in')
    fill_in 'username', with: 'newuser'
    fill_in 'password', with: '123456'
    click_button 'Submit'
    expect(page).to have_content('List App')
    find(:css, '.dropdown').click
    click_button 'Logout'
  end

  it 'not valid data in password confirmation field' do
    visit('http://localhost:4000/signup')
    fill_in 'username', with: 'newuser'
    fill_in 'password', with: '123456'
    fill_in 'password_confirmation', with: '123'
    click_button 'Sign up'
    expect(page).not_to have_content('Sign in')
  end

  it 'nil password field' do
    visit('http://localhost:4000/signup')
    fill_in 'username', with: 'newuser'
    fill_in 'password', with: ''
    fill_in 'password_confirmation', with: ''
    click_button 'Sign up'
    expect(page).not_to have_content('Sign in')
  end

  it 'nil username field' do
    visit('http://localhost:4000/signup')
    fill_in 'username', with: ''
    fill_in 'password', with: '123456'
    fill_in 'password_confirmation', with: '123456'
    click_button 'Sign up'
    expect(page).not_to have_content('Sign in')
  end
end
