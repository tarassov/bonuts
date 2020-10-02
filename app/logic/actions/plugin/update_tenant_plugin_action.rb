class UpdateTenantPluginAction < BaseAction
   
    protected
    def do_call 
        tenant_plugin = TenantPlugin.find(@args[:tenant_plugin_id])  
        unless tenant_plugin
            errors.add :error, 'Plugin not found'
            return
        end  

       
       

        if tenant_plugin.plugin_settings.any?
            tenant_plugin.plugin_settings.each do |setting|
                    
            end
        end  
            
        return  tenant_plugin
    end
end
  
   