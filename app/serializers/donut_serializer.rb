# frozen_string_literal: true

class DonutSerializer
  include JSONAPI::Serializer
  set_type :donut
  attributes :name, :price, :id, :active

  attribute :expiration_date do |object|
    object.expiration_date.strftime('%Y-%m-%d')
  end
end
