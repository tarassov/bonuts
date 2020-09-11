# frozen_string_literal: true

require 'rails_helper'

describe ActivatePlugin do
  before(:context) do 
    @tenant = create(:tenant)
    @plugin = create(:plugin)
  end

  context 'when new' do
      before do
          @result = ActivatePlugin.call({plugin_id: @plugin.id})
      end

      it 'adds plugin to tenant' do
        expect(@tenant.plugins.where(plugin: @plugin).count).to eq 1
      end  

      it 'create plugins properties' do
        expect(@profile_asset.deals.where(deal_type: 'activate_regard').count).to eq 1
      end     
  end

  context 'when exists' do
    it 'updates properties' 
  end
end
