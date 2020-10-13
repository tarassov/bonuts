# frozen_string_literal: true

require 'rails_helper'

describe UpdateTenantPlugin do
  before(:context) do 
    @tenant = create(:tenant_with_profiles)
    @plugin = create(:plugin)
    @host_property =create(:plugin_property, plugin: @plugin)
    @host_property.name="host"
    @host_property.save
    @key_property  = create(:plugin_property, plugin: @plugin)
    @key_property.name="key"
    @key_property.save

    @tenant_plugin = create(:tenant_plugin, tenant: @tenant, plugin: @plugin, active: false)    

    @profileAdmin = @tenant.profiles.where(:admin => true)[0]    
    @tenant_settings = {host: "demo.ru", key: "111-111-111"}
  end

  context 'when user not admin' do
    before do
      @profileNotAdmin = @tenant.profiles.where(:admin => true)[0]
      @resultNotAdmin = UpdateTenantPlugin.call({tenant_plugin_id: @tenant_plugin.id, profile: @profileNotAdmin, tenant_settings:  @tenant_settings})
    end
    it 'fails' do
      expect(@resultNotAdmin.errors.count).to eq  0
    end
  end

  context 'when success' do
      before do
        @resultNotAdmin = UpdateTenantPlugin.call({tenant_plugin_id: @tenant_plugin.id, profile: @profileAdmin, active: true, tenant_settings:  @tenant_settings})
      end

      it 'updates host to: "demo.ru"' do
        value = @tenant_plugin.plugin_settings.find_by(plugin_property_id: @host_property.id).value
        expect(value).to eq ("demo.ru")
      end   
      
      it 'updates key to: "111-111-111"}"' do
        value = @tenant_plugin.plugin_settings.find_by(plugin_property_id: @key_property.id).value
        expect(value).to eq ("111-111-111")
      end

      it 'updates active to false ' do
        expect(TenantPlugin.find(@tenant_plugin.id).active).to eq true
      end
  end

 

end
