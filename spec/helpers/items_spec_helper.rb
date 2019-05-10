# frozen_string_literal: true

# Helper for items_controller_spec.rb
module ItemsSpecHelper
  def index_get_items
    get '/api/items', params: { inputValue: item.content }, headers: login_user(user)
  end

  def post_items
    post '/api/items', params: { item: { content: 'New item' }, list_id: list.id }, headers: login_user(user)
  end

  def destroy_item
    delete "/api/items/#{item.id}", headers: login_user(user)
  end

  def expected_item
    list.items.last.slice('id', 'content', 'list_id')
  end
end
