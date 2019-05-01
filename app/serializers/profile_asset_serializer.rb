class ProfileAssetSerializer
  include FastJsonapi::ObjectSerializer
  set_id :id
  set_type :profile_asset
  attributes :enbled, :donut, :id, :date_used

  attribute :donut_name do |object|
    object.donut.name
  end
end
