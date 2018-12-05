# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Follow, type: :model do
  subject { follow }

  let(:follower) { create(:user) }
  let(:followed) { create(:user) }
  let(:follow) { follower.friends.build(followed_id: followed.id) }

  describe 'When followed id is not presence' do
    before { follow.followed_id = nil }

    it { is_expected.not_to be_valid }
  end

  describe 'When follower id is not presence' do
    before { follow.follower_id = nil }

    it { is_expected.not_to be_valid }
  end
end
