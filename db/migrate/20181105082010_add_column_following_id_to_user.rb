# frozen_string_literal: true

# DropFrinds migration
class AddColumnFollowingIdToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :follow_id, :integer, array: true, default: []
  end
end
