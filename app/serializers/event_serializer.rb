class EventSerializer
  include FastJsonapi::ObjectSerializer
  set_id :id
  set_type :event
  attributes :date_string, :id,:public

  attribute :content do |object|
    if object.event_type && object.event_type.name == "account"
        object.extra_content
    else
        object.content    
    end   
  end

  attribute :extra_content do |object|
    object.extra_content if !object.event_type || object.event_type.name != "account"
  end

  attribute :user_name do |object|
    object.profile.user.first_name + " " + object.profile.user.last_name
  end
  attribute :user_id do |object|
    object.profile.user.id
  end

  attribute :user_avatar do |object|
    object.profile.user.avatar
  end

  attribute :operation do |object|
    if object.account_operation
      direction  = object.account_operation.direction if object.account_operation
      amount = object.account_operation.amount if object.account_operation
      user  =  object.account_operation.account.profile.user if object.account_operation
      operation  = {direction: direction, amount: amount, user: user}
    else
      operation = nil
    end  
  end
  
  attribute :position do |object|
    department = object.profile.department
    department_name = department ? department.name+ ", " : "" 
    position_name  = object.profile.position ? object.profile.position : ""
    department_name + position_name
  end

  attribute :event_name do |object|
    if object.event_type
      object.event_type.name 
    else
      ""
    end  
  end
end
