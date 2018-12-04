# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ListsController, type: :request do
  subject { list }

  let(:user) { create(:user) }
  let!(:list) { create(:list, user: user) }

  describe '#index' do
    before { index_get_lists }

    include_examples 'list_index_examples'
  end

  describe '#create' do
    before { post_lists }

    include_examples 'list_create_examples'
  end

  describe '#update' do
    before { put_lists }

    include_examples 'list_update_examples'
  end

  describe '#destroy' do
    include_examples 'list_destroy_examples'
  end
end
