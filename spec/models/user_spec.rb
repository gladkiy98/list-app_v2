# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { create(:user) }

  it 'is valid with valid attributes' do
    expect(user).to be_valid
  end

  it 'is not valid without a password' do
    user2 = build(:user, password: nil)
    expect(user2).not_to be_valid
  end

  it 'is not valid without a username' do
    user2 = build(:user, username: nil)
    expect(user2).not_to be_valid
  end

  it 'is not valid without a password_confirmation' do
    user2 = build(:user, password_confirmation: nil)
    expect(user2).not_to be_valid
  end

  it 'user not create with different password & password_confirmation' do
    user2 = build(:user, password: '123', password_confirmation: '124')
    expect(user2).not_to be_valid
  end

  it { is_expected.to respond_to(:friends) }
end
