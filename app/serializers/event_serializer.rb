class EventSerializer
  include FastJsonapi::ObjectSerializer
  set_id :id
  set_type :event
  attributes :date_string, :content, :extra_content, :id

  attribute :user_name do |object|
    object.profile.user.first_name + " " + object.profile.user.last_name
  end

  attribute :position do |object|
    object.profile.department.name + ", "  + object.profile.position
  end
end
