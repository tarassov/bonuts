# frozen_string_literal: true

class DonutSerializer
  include FastJsonapi::ObjectSerializer
  set_type :donut
  attributes :name, :price, :id

  attribute :expiration_date do |object|
    object.expiration_date.strftime('%Y-%m-%d')
  end
end
