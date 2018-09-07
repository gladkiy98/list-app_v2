require 'rails_helper'

RSpec.describe UsersController, :type => :controller do
  let(:user) { build(:user) }

  describe "#create" do
    context "when a successfull response" do
      let(:params) do
        { user: {
          username: user.username,
          password: user.password,
          password_confirmation: user.password_confirmation
        } }
      end

      it { expect(response).to be_success }
    end

    context "when a bad response" do
      let(:params) do
        { user: {
          username: user.username,
          password: user.password,
          password_confirmation: 123
        } }
      end

      it { expect(response).to be_success }
    end

  end
end
