# frozen_string_literal: true

class Api::V1::Plugins::IndexSerializer < ActiveModel::Serializer
  attributes :data

  class PluginSerializer < ActiveModel::Serializer
    class PluginSettingSerializer < ActiveModel::Serializer
      attributes :id, :value, :name, :notes

      delegate :name, :notes, to: :plugin_property

      delegate :plugin_property, to: :object
    end

    attributes :id, :name, :active

    def tenant_plugin
      scope[:tenant].tenant_plugins.find_by(id: object.id)
    end

    def active
      tenant_plugin.present? && tenant_plugin.active
    end

    def settings
      tenant_plugin.plugin_settings if tenant_plugin.present?
    end

    has_many :settings, serializer: PluginSettingSerializer
  end

  def data
    tenant = scope[:tenant]

    object.map do |plugin|
      PluginSerializer.new(plugin, scope: { tenant: }).as_json
    end
  end
end
