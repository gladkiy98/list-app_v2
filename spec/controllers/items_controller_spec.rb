# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ItemsController, type: :request do
  let(:user) { create(:user) }
  let(:list) { create(:list, user: user) }
  let(:item) { create(:item, list: list) }

  describe '#index' do
    before { index_get_items }

    include_examples 'item_index_examples'
  end

  describe '#create' do
    before { post_items }

    include_examples 'item_create_examples'
  end

  describe '#destory' do
    include_examples 'item_destroy_examples'
  end
end
