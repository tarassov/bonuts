# frozen_string_literal: true

class UserSerializer
  include JSONAPI::Serializer
  set_type :user
  set_id :id
  attributes :id, :email, :last_name, :first_name, :sex, :notes, :email_confirmed, :name

  # cache_options enabled: true, cache_length: 2.hours
end
