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
      @request = Request.create!({ profile: @profile, donut: @donut, status: 0 })
      @result = ActivateRegard.call({ asset: @request, profile: @store_admin })
    end

    it 'activates regard' do
      expect(@request.status).to eq 1
    end

    it 'adds activate deal to stack' do
      expect(@request.deals.where(deal_type: :activate_regard).count).to eq 1
    end

    it 'notfies user'

    it 'notifies boss'
  end
end
