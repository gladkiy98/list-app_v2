# frozen_string_literal: true

# serializer for Item model
class ItemSerializer < ActiveModel::Serializer
  attributes :id, :content, :list_id
end
