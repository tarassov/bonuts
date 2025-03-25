# frozen_string_literal: true

class Api::V1::Plugins::IndexSerializer < ActiveModel::Serializer
  attributes :data

  class PluginSerializer < ActiveModel::Serializer
    class PluginPropertySerializer < ActiveModel::Serializer
      attributes :id, :name, :notes, :value

      def value
        scope[:setting].value if scope[:setting].present?
      end
    end

    attributes :id, :name, :active, :settings

    def tenant_plugin
      scope[:tenant].tenant_plugins.find_by(id: object.id)
    end

    def active
      tenant_plugin.present? && tenant_plugin.active
    end

    def settings
      object.plugin_properties.map do |property|
        setting = tenant_plugin&.plugin_settings&.find_by(plugin_property_id: property.id)
        PluginPropertySerializer.new(property, scope: { setting: }).as_json
      end
    end
  end

  def data
    tenant = scope[:tenant]

    object.map do |plugin|
      PluginSerializer.new(plugin, scope: { tenant: }).as_json
    end
  end
end
