# frozen_string_literal: true

require 'rails_helper'

describe ActivateRegard do
  before(:context) do
    @tenant = create(:tenant)
  end

  context 'when success' do
    before do
      ActionMailer::Base.deliveries = []
      @profile = create(:profile, tenant: @tenant)
      @store_admin = create(:profile, tenant: @tenant, store_admin: true)
      @donut = create(:donut, tenant: @tenant)
      @profile_asset = ProfileAsset.create!({ profile: @profile, donut: @donut, status: 0 })
      @result = ActivateRegard.call({ asset: @profile_asset, profile: @store_admin })
    end

    it 'activates regard' do
      expect(@profile_asset.status).to eq 1
    end

    it 'adds activate deal to stack' do
      expect(@profile_asset.deals.where(deal_type: 'activate_regard').count).to eq 1
    end

    it 'notfies user'

    it 'notifies boss'
  end
end
