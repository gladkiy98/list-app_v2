# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UsernamesController, type: :request do
  let(:user) { create(:user) }

  describe '#index' do
    context 'when user authenticated' do
      before do
        get '/api/usernames', headers: login_user(user)
      end

      it 'has a 200 status code' do
        expect(response.status).to eq(200)
      end

      it 'has return a current user name' do
        expect(response.body).to eq(user.username)
      end
    end
  end
end
