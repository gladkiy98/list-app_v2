# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, js: true, type: :feature do
  it 'check if user exist' do
    name_pass_and_pass_conf('createuser', 'password', 'password')
    name_pass_and_pass_conf('createuser', 'password', 'password')
    expect(page).to have_content(
      'Username has already been taken'
    )
  end
end
