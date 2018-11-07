# frozen_string_literal: true

# removeFollowTable migration
class RemoveFollowTable < ActiveRecord::Migration[5.2]
  def change
    drop_table :follows
  end
end
