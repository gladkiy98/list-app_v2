# frozen_string_literal: true

ActiveRecord::Schema.define(version: 20_181_012_131_038) do
  enable_extension 'plpgsql'

  create_table 'items', force: :cascade do |t|
    t.string 'content'
    t.integer 'list_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index %w[list_id created_at], name: 'index_items_on_list_id_and_created_a'
  end

  create_table 'lists', force: :cascade do |t|
    t.string 'title'
    t.integer 'user_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index %w[user_id created_at], name: 'index_lists_on_user_id_and_created_a'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'username'
    t.string 'password_digest'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end
end
