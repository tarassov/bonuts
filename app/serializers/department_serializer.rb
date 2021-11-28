# frozen_string_literal: true

class DepartmentSerializer
  include JSONAPI::Serializer
  set_type :department
  attributes :name, :id

  attribute :head_profile do |department|
    if department.head_profile
      user = department.head_profile.user
      { name: user.name, id: department.head_profile.id }
    else
      {}
    end
  end

  # cache_options enabled: true, cache_length: 2.hours
end
