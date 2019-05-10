# frozen_string_literal: true

RSpec.shared_examples 'list_destroy_examples' do
  it do
    destroy_list
    expect(response.status).to eq(204)
  end

  it { expect { destroy_list }.to change(List, :count).by(-1) }
end
