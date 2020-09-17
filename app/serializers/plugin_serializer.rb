
class PluginSerializer
    include FastJsonapi::ObjectSerializer
    set_id :id
    set_type :plugin
    attributes  :name,:id

    attribute :active do |record, params|
        if params[:tenant]
            params[:tenant].plugins.exists?(record.id) if params[:tenant]
            
        else
            false    
        end 
    end

    attribute :settings do |record, params|
       # if params && params[:include_properties] && params[:profile]
          properties_array = []
          tenant_plugin =  params[:tenant].tenant_plugins.find_by(plugin: record)
          if tenant_plugin
            tenant_plugin.plugin_settings.each do |property|
                properties_array << { id: property.id, name: property.name, notes: property.notes}
            end
          end  
          properties_array
        #end
      end

    
  end
  