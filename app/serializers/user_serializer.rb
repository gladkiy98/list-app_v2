# frozen_string_literal: true

# UserSerializer is serialize need attributes for me
class UserSerializer < ActiveModel::Serializer
  attributes :id, :username
end
