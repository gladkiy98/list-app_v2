require 'rails_helper'

RSpec.describe User, :type => :model do

  before(:all) do
    @user = create(:user)
  end

  it "is valid with valid attributes" do
    expect(@user).to be_valid
  end

  it "is not valid without a password" do
    user2 = build(:user, password: nil)
    expect(user2).to_not be_valid
  end

  it "is not valid without a username" do
    user2 = build(:user, username: nil)
    expect(user2).to_not be_valid
  end

  it "is not valid without a username and password" do
    user2 = build(:user, username: nil, password: nil)
    expect(user2).to_not be_valid
  end

end
