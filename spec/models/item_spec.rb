# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Item, type: :model do
  let(:user) { create(:user) }
  let(:list) { create(:list, user: user) }
  let(:item) { create(:item, list: list) }

  it 'is valid' do
    expect(item).to be_valid
  end
end
