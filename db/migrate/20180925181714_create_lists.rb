# frozen_string_literal: true

# createLists migration
class CreateLists < ActiveRecord::Migration[5.2]
  def change
    create_table :lists do |t|
      t.string :title
      t.integer :user_id

      t.timestamps
    end
    add_index :lists, %i[user_id created_at]
  end
end
