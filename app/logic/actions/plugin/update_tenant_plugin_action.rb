class UpdateTenantPluginAction < BaseAction
   
    protected
    def do_call 
        tenant_plugin = TenantPlugin.find(@args[:tenant_plugin_id])  
        tenant_settings = @args[:tenant_settings]  
        unless tenant_plugin
            errors.add :error, 'Plugin not found'
            return
        end  

       
        tenant_plugin.active = @args[:active] 
        tenant_plugin.save

        if tenant_plugin.plugin_settings.any?
            tenant_plugin.plugin_settings.each do |setting|
                new_value = tenant_settings.with_indifferent_access[setting.plugin_property.name]
                name = setting.plugin_property.name
                setting.value =  new_value  
                setting.save
            end
        end  
            
        return  tenant_plugin
    end
end
  
   