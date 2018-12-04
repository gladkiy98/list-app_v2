# frozen_string_literal: true

require 'rails_helper'

RSpec.describe List, type: :model do
  let(:user) { create(:user) }
  let(:list) { create(:list, user: user) }

  it 'is valid' do
    expect(list).to be_valid
  end

  it 'is not valid' do
    list2 = build(:list, user_id: nil)
    expect(list2).not_to be_valid
  end
end
