class EventSerializer
  include FastJsonapi::ObjectSerializer
  set_id: id
  set_type :event
  attributes :date_string, :content, :extra_content, :id

  attribute :user_name do |object|
    object.profile.user.name
  end
end
