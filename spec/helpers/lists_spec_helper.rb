# frozen_string_literal: true

# Helper for lists_controller_spec.rb
module ListsSpecHelper
  def index_get_lists
    get '/api/lists', headers: login_user(user)
  end

  def post_lists
    post '/api/lists', params: { list: { 'title': 'New title' } }, headers: login_user(user)
  end

  def put_lists
    put "/api/lists/#{list.id}", params: { list: { 'title': 'New title' } }, headers: login_user(user)
  end

  def destroy_list
    delete "/api/lists/#{list.id}", headers: login_user(user)
  end

  def expected_created_list(val)
    user.lists.last.slice(val).delete(val)
  end

  def expected_index_list
    { 'createdAt' => JSON.parse(list.created_at.to_json),
      'id' => list.id,
      'title' => list.title,
      'userId' => user.id }
  end

  def expected_update_list
    { 'created_at' => JSON.parse(list.created_at.to_json),
      'id' => list.id,
      'title' => 'New title',
      'user_id' => user.id }
  end
end
