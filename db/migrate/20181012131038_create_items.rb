# frozen_string_literal: true

# create Items
class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :content
      t.integer :list_id

      t.timestamps
    end
    add_index :items, %i[list_id created_at]
  end
end
