# frozen_string_literal: true

# CreateFollows migration
class CreateFollows < ActiveRecord::Migration[5.2]
  def change
    create_table :follows do |t|
      t.integer :follower_id
      t.integer :followed_id

      t.timestamps
    end
    add_index :follows, :follower_id
    add_index :follows, :followed_id
    add_index :follows, %i[follower_id followed_id], unique: true
  end
end
