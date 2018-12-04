# frozen_string_literal: true

RSpec.shared_examples 'item_destroy_examples' do
  it do
    destroy_item
    expect(response.status).to eq(204)
  end

  it { expect { destroy_item }.to change(Item, :count).by(0) }
end
