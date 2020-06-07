
class DonutsSchedulerSerializer
    include FastJsonapi::ObjectSerializer
    set_id :id
    set_type :donuts_scheduler
    attributes :active, :day, :id, :comment,  :profile

    attribute :user_name do |object|
      object.profile.user.name
    end

    attribute :created_at do |object|
      Serializer::DateSerializer.serialize(object.created_at)
    end 

  
    attribute :updated_at do |object|
      Serializer::DateSerializer.serialize(object.updated_at)
    end
  
    
  end
  