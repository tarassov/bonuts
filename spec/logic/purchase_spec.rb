# frozen_string_literal: true

require 'rails_helper'

describe Purchase do
  before(:context) do
    @intial_balance = 60
    @amount = 50
    @tenant = create(:tenant)
    @donut = create(:donut, tenant: @tenant)
  end

  context 'when not enought dounts' do
    before do
    end
    it 'returns error when not enough donuts' do
      # expect(@resultFailed.errors.count).to eq 1
    end
    it 'checks donuts amount' do
      # expect(@resultFailed.errors[:error].first).to eq  I18n.t('account.not_enough_donuts')
    end
  end

  context 'when success' do
    before do
      ActionMailer::Base.deliveries = []
      @profile = create(:profile, tenant: @tenant)
      @store_admin = create(:profile, tenant: @tenant, store_admin: true)
      deposit = DepositAction.call({ account: @profile.self_account, amount: @donut.price })
      @result = Purchase.call({ profile: @profile, donut_id: @donut.id })
    end

    it 'notifies store admin' do
      expect(ActionMailer::Base.deliveries.count).to eq 1
    end

    it 'reduces account score' do
      expect(@profile.self_account.balance).to eq 0
    end

    it 'adds donut to profile assets' do
      assets = Request.where(profile: @profile, donut: @donut)
      expect(assets.count).to eq 1
    end

    it 'adds buy deal to stack' do
      assets = Request.where(profile: @profile, donut: @donut).first
      expect(assets.deals.where(deal_type: 'buy').count).to eq 1
    end
  end

  context 'when not enough points' do
    before do
      @profile = create(:profile, tenant: @tenant)
      deposit = DepositAction.call({ account: @profile.self_account, amount: @donut.price - 1 })
      @resultFailed = Purchase.call({ profile: @profile, donut_id: @donut.id })
    end

    it 'retruns error' do
      expect(@resultFailed.errors[:error].first).to eq I18n.t('account.not_enough_points')
    end
  end
end
