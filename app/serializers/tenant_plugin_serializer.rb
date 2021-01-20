
class TenantPluginSerializer
    include JSONAPI::Serializer
    set_id :id
    set_type :plugin
    attributes  :id,:active

    attribute :name do |record|
        record.plugin.name
    end
    attribute :settings do |record, params|
       # if params && params[:include_properties] && params[:profile]
          settings_array = []
          tenant_plugin = record
          if tenant_plugin
            tenant_plugin.plugin_settings.each do |setting|
                settings_array << { id: setting.id, name: setting.plugin_property.name, value: setting.value, notes: setting.plugin_property.notes}
            end
          end  
          settings_array
        #end
      end

    
  end
  