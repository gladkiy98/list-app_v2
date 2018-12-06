# frozen_string_literal: true

RSpec.shared_examples 'list_create_examples' do
  it { expect(response.status).to eq(201) }
  it { expect(JSON.parse(response.body)['id']).to eq(expected_created_list('id')) }
  it { expect(JSON.parse(response.body)['title']).to eq(expected_created_list('title')) }
  it { expect(JSON.parse(response.body)['user_id']).to eq(expected_created_list('user_id')) }
  it { expect(JSON.parse(response.body)['created_at']).to eq(JSON.parse(expected_created_list('created_at').to_json)) }
end
