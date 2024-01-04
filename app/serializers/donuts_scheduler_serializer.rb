class DonutsSchedulerSerializer
  include JSONAPI::Serializer
  set_id :id
  set_type :scheduler
  attributes :active, :day, :id, :comment, :profile, :every, :amount, :burn_old, :name, :timezone, :execute_time, :weekday

  attribute :user_name do |object|
    object.profile.user.name
  end

  attribute :created_at do |object|
    Serializer::DateSerializer.serialize(object.created_at)
  end

  attribute :updated_at do |object|
    Serializer::DateSerializer.serialize(object.updated_at)
  end

  attribute :profile do |object|
    ProfileSerializer.new(object.profile,
                          { params: { show_account: false } }).serializable_hash[:data][:attributes].as_json
  end
end
