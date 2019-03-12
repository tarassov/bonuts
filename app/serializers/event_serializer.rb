class EventSerializer
  include FastJsonapi::ObjectSerializer
  attributes :date_string, :content, :extra_content, :id

  attribute :user_name do |object|
    object.profile.user.name
  end
end
