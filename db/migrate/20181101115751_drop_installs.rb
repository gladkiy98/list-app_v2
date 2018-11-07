# frozen_string_literal: true

# DropInstalls migration
class DropInstalls < ActiveRecord::Migration[5.2]
  def change
    drop_table :friends
  end
end
