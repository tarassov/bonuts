# frozen_string_literal: true

class ListUserSerializer
  include FastJsonapi::ObjectSerializer
  set_type :user
  set_id :id
  attributes :name, :id, :email, :last_name, :first_name, :sex, :notes

  # cache_options enabled: true, cache_length: 2.hours
end
