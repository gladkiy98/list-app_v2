# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ItemsController, type: :request do
  include_context 'when item `let` examples'

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
