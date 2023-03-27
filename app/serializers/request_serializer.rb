# frozen_string_literal: true

class RequestSerializer
  include JSONAPI::Serializer
  set_id :id
  set_type :request
  attributes :enabled, :id, :date_used, :public_uid, :deleted
  attribute :donut_name do |object|
    object.donut.name
  end

  attribute :donut do |object|
    DonutSerializer.new(object.donut).serializable_hash[:data][:attributes].as_json
  end

  attribute :profile do |object|
    ProfileSerializer.new(object.profile,
                          { params: { show_account: true } }).serializable_hash[:data][:attributes].as_json
  end

  attribute :name do |object|
    object.profile.user.name
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
