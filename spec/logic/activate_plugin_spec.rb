# frozen_string_literal: true

require 'rails_helper'

describe ActivatePlugin do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @plugin = create(:plugin)
    @plugin2 = create(:plugin)
    @tenant_pluign = create(:tenant_plugin, tenant: @tenant, plugin: @plugin2)
    @profileAdmin = @tenant.profiles.where(admin: true)[0]
  end

  context 'when user not admin' do
    before do
      @profileNotAdmin = @tenant.profiles.where(admin: true)[0]
      @resultNotAdmin = ActivatePlugin.call({ plugin_id: @plugin.id, profile: @profileNotAdmin })
    end
    it 'fails' do
      expect(@resultNotAdmin.errors.count).to eq 0
    end
  end

  context 'when new' do
    before do
      @result = ActivatePlugin.call({ plugin_id: @plugin.id, profile: @profileAdmin })
    end

    it 'adds plugin to tenant' do
      expect(@tenant.tenant_plugins.where(plugin_id: @plugin.id).count).to eq 1
    end

    it 'create plugins properties' do
      expect(@tenant.tenant_plugins.find_by(plugin_id: @plugin.id).plugin_settings.count).to eq @plugin.plugin_properties.count
    end
  end

  context 'when exists' do
    before do
      plugin_property = create(:plugin_property, plugin: @plugin2)
      @result = ActivatePlugin.call({ plugin_id: @plugin2.id, profile: @profileAdmin })
    end

    it 'does not create new tenant pluign' do
      expect(@tenant.tenant_plugins.where(plugin_id: @plugin2.id).count).to eq 1
    end

    it 'adds plugins properties' do
      expect(@tenant.tenant_plugins.find_by(plugin: @plugin2).plugin_settings.count).to eq @plugin2.plugin_properties.count
    end
  end
end
