# frozen_string_literal: true

require 'rails_helper'

describe UpdateTenantPlugin do
  before(:context) do 
    @tenant = create(:tenant_with_profiles)
    @plugin = create(:plugin)
    @tenant_plugin = create(:tenant_plugin, tenant: @tenant, plugin: @plugin, active: true)    
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
        @resultNotAdmin = UpdateTenantPlugin.call({tenant_plugin_id: @tenant_plugin.id, profile: @profileAdmin, tenant_settings:  @tenant_settings})
      end

      it 'updates plugin settings'     
  end

 

end
