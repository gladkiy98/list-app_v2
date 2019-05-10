# frozen_string_literal: true

RSpec.shared_context 'when item `let` examples' do
  let(:user) { create(:user) }
  let(:list) { create(:list, user: user) }
  let(:item) { create(:item, list: list) }
end
