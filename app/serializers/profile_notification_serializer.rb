class ProfileNotificationSerializer
  include JSONAPI::Serializer
  set_id :id
  set_type :profile_notification
  attributes :id, :tenant_plugin, :active, :disabled
end
