class ActivatePluginAction < BaseAction
   
    protected
    def do_call 
      plugin = Plugin.find(@args[:plugin_id])  
      unless plugin
        errors.add :error, 'Plugin not found'
        return
      end  

      tenant_plugin  = action_tenant.tenant_plugins.find_by(plugin: plugin)
      
      unless tenant_plugin
        tenant_plugin = TenantPlugin.create!(tenant: action_tenant, plugin: plugin, active: true)       
      end
      tenant_plugin.active =true
        if plugin.plugin_properties.any?
            plugin.plugin_properties.each do |property|
                    unless tenant_plugin.plugin_settings.where(plugin_property: property).any?
                        PluginSetting.create!(tenant: action_tenant, plugin: plugin,tenant_plugin: tenant_plugin, plugin_property: property)
                    end
            end
        end  
        
       return  plugin
    end
end
  
   