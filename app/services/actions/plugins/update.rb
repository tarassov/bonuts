# frozen_string_literal: true
class Actions::Plugins::Update < BaseAction
  def args_to_check
    [:tenant_plugin, :plugin_settings]
  end

  protected

  def do_call
    tenant_plugin = get_argument(:tenant_plugin)
    plugin_settings = get_argument(:plugin_settings)

    return handle_missing_plugin unless tenant_plugin

    plugin_id = tenant_plugin.plugin.id
    tenant_id = tenant_plugin.tenant.id

    plugin_settings.each do |setting|
      update_or_create_plugin_setting(tenant_plugin, setting, plugin_id, tenant_id)
    end

    tenant_plugin
  end

  private

  def handle_missing_plugin
    errors.add(:error, I18n.t("plugin.plugin_not_found"))
    nil
  end

  def update_or_create_plugin_setting(tenant_plugin, setting, plugin_id, tenant_id)
    plugin_setting = tenant_plugin.plugin_settings.find_or_initialize_by(plugin_property_id: setting[:id])

    if plugin_setting.new_record?
      plugin_setting.plugin_id = plugin_id
      plugin_setting.tenant_id = tenant_id
      plugin_setting.plugin_property_id = setting[:id]
    end

    plugin_setting.value = setting[:value]
    plugin_setting.save
  end
end
