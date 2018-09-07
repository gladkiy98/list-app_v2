require 'rails_helper'

feature 'homepage', js: true do
  background do
    visit('http://localhost:4000/')
  end

  scenario 'visit homepage' do
    
      fill_in 'username', with: 'user'
      fill_in 'Password', with: '123456'
     click_button 'Submit'
  end
end
