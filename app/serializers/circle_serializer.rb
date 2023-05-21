# frozen_string_literal: true

class CircleSerializer
  include JSONAPI::Serializer
  set_type :circle
  set_id :id
  attributes :name, :active
end
