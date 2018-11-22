# frozen_string_literal: true

# serializer for List model
class ListSerializer < ActiveModel::Serializer
  attributes :id, :title, :user_id, :created_at
end
