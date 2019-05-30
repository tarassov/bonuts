class ProfileAssetSerializer
  include FastJsonapi::ObjectSerializer
  set_id :id
  set_type :regard
  attributes :enabled, :donut, :id, :date_used
  attribute :donut_name do |object|
    object.donut.name
  end

  attribute :created_at do |object|
    Serializer::DateSerializer.serialize(object.created_at)
  end

  
  attribute :date_used do |object|
    Serializer::DateSerializer.serialize(object.date_used)
  end

  
  attribute :updated_at do |object|
    Serializer::DateSerializer.serialize(object.updated_at)
  end

  attribute :status do |object|
     object.status || 0
  end


end
