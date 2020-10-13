
class PluginSerializer
    include FastJsonapi::ObjectSerializer
    set_id :id
    set_type :plugin
    attributes  :name,:id

    attribute :active do |record, params|
        if params[:tenant]
            params[:tenant].plugins.where(tenant_plugins: {active: true}).exists?(record.id) if params[:tenant]
            
        else
            false    
        end 
    end

    attribute :settings do |record, params|
       # if params && params[:include_properties] && params[:profile]
          settings_array = []
          tenant_plugin =  params[:tenant].tenant_plugins.find_by(plugin: record)
          if tenant_plugin
            tenant_plugin.plugin_settings.each do |setting|
                settings_array << { id: setting.id, name: setting.plugin_property.name, value: setting.value, notes: setting.plugin_property.notes}
            end
          end  
          settings_array
        #end
      end

    
  end
  