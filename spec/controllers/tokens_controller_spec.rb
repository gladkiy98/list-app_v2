# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TokensController, type: :request do
  let(:user) { create(:user) }

  describe '#create' do
    context 'when user authenticated with valid params' do
      before do
        post '/api/tokens', params: {
          'username': user.username,
          'password': user.password,
        }
      end

      it 'has a 200 status code' do
        expect(response.status).to eq(200)
      end
    end
  end
end
