# frozen_string_literal: true

RSpec.shared_context 'when list `let` examples' do
  subject { list }

  let(:user) { create(:user) }
  let!(:list) { create(:list, user: user) }
end
