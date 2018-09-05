# frozen_string_literal: true

ActiveRecord::Schema.define(version: 20_180_816_081_200) do
  enable_extension 'plpgsql'

  create_table 'users', force: :cascade do |t|
    t.string 'username'
    t.string 'password_digest'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end
end
