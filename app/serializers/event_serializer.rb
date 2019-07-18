class EventSerializer
  include FastJsonapi::ObjectSerializer
  set_id :id
  set_type :event
  attributes :date_string, :content, :extra_content, :id,:public

  attribute :user_name do |object|
    object.profile.user.first_name + " " + object.profile.user.last_name
  end
  attribute :user_id do |object|
    object.profile.user.id
  end

  attribute :user_avatar do |object|
    object.profile.user.avatar
  end

  attribute :position do |object|
    department = object.profile.department
    department_name = department ? department.name+ ", " : "" 
    position_name  = object.profile.position ? object.profile.position : ""
    department_name + position_name
  end
end
