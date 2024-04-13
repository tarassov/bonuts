class TenantPluginSerializer
  include JSONAPI::Serializer
  set_id :id
  set_type :plugin
  attributes :id, :active

  attribute :name do |record|
    record.plugin.name
  end
  attribute :settings do |record, _params|
    # if params && params[:include_properties] && params[:profile]
    settings_array = []
    tenant_plugin = record
    tenant_plugin&.plugin_settings&.each do |setting|
      settings_array << {
        id: setting.id,
        name: setting.plugin_property.name,
        value: setting.value,
        notes: setting.plugin_property.notes,
      }
    end
    settings_array
    # end
  end
end
