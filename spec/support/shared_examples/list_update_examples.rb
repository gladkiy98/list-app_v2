# frozen_string_literal: true

RSpec.shared_examples 'list_update_examples' do
  it { expect(response.status).to eq(200) }
  it { expect(JSON.parse(response.body)).to eq(expected_update_list) }
end
