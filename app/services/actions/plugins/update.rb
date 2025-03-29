# frozen_string_literal: true

class Actions::Plugins::Update < BaseAction
  def args_to_check
    [:tenant_plugin, :plugin_settings]
  end

  protected

  def do_call
    # check existence
    tenant_plugin = get_argument(:tenant_plugin)
    plugin_settings = get_argument(:plugin_settings)

    unless tenant_plugin
      errors.add(:error, I18n.t("plugin.plugin_not_found"))
      return
    end

    if tenant_plugin.nil?
      errors.add(:error, I18n.t("plugin.plugin_not_found"))
      return
    end

    plugin_settings.each do |setting|
      plugin_setting = tenant_plugin.plugin_settings.find_by({ plugin_property_id: setting[:id] })
      if plugin_setting.nil?
        plugin_setting = tenant_plugin.plugin_settings.build({ plugin_property_id: setting[:id], value: setting[:value] })
      else
        plugin_setting.value = setting[:value]
      end
      plugin_setting.save
    end

    tenant_plugin
  end
end

# frozen_string_literal: true

