# frozen_string_literal: true

# DropFrinds migration
class DropFrinds < ActiveRecord::Migration[5.2]
  def change
    drop_table :frinds
  end
end
