# frozen_string_literal: true

RSpec.shared_examples 'item_create_examples' do
  it { expect(response.status).to eq(201) }
  it { expect(JSON.parse(response.body)).to eq(expected_item) }
end
