# frozen_string_literal: true

RSpec.shared_examples 'item_index_examples' do
  it { expect(response.status).to eq(200) }
  it { expect(JSON.parse(response.body)).to eq([item.content]) }
end
