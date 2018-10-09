# frozen_string_literal: true

ActiveRecord::Schema.define(version: 20_180_925_181_714) do
  enable_extension 'plpgsql'

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
