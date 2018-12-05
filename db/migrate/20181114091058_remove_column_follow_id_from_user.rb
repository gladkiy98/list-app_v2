# frozen_string_literal: true

# RemoveColumnFollowIdFromUser migration
class RemoveColumnFollowIdFromUser < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :follow_id
  end
end
