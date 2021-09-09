class UpdateTenantPluginAction < BaseAction
  protected

  def do_call
    tenant_plugin = TenantPlugin.where(plugin_id: @args[:plugin_id], tenant_id: action_tenant.id).first
    tenant_settings = @args[:tenant_settings]
    unless tenant_plugin
      errors.add :error, 'Plugin not found'
      return
    end

    tenant_plugin.active = @args.fetch(:active, false)
    tenant_plugin.save

    if tenant_plugin.plugin_settings.any?
      tenant_plugin.plugin_settings.each do |setting|
        new_value = tenant_settings.with_indifferent_access[setting.plugin_property.name]
        name = setting.plugin_property.name
        setting.value = new_value
        setting.save
      end
    end

    tenant_plugin
  end
end
