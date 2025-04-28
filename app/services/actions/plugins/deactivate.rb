# frozen_string_literal: true

class Actions::Plugins::Deactivate < BaseAction
  def args_to_check
    [:plugin]
  end

  protected

  def do_call
    # check existence
    plugin = get_argument(:plugin)

    unless plugin
      errors.add(:error, I18n.t("plugin.plugin_not_found"))
      return
    end

    tenant_plugin = @tenant.tenant_plugins.find_by(plugin_id: plugin.id)

    if tenant_plugin.nil?
      errors.add(:not_found, I18n.t("plugin.plugin_not_found"))
      return
    else
      tenant_plugin.active = false
      tenant_plugin.save!

    end

    tenant_plugin
  end
end
