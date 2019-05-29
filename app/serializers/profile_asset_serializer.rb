class ProfileAssetSerializer
  include FastJsonapi::ObjectSerializer
  set_id :id
  set_type :regard
  attributes :enabled, :donut, :id, :date_used

  attribute :donut_name do |object|
    object.donut.name
  end

  attribute :date_create do |object|
    object.date_create.strftime("%Y-%m-%d") if object.date_create
  end
end
