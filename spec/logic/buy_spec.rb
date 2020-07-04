# frozen_string_literal: true

require 'rails_helper'

describe Buy do
  before(:context) do
    @intial_balance = 60
    @amount = 50
    @tenant = create(:tenant)
    @donut = create(:donut, tenant: @tenant) 
    @profile = create(:profile, tenant: @tenant) 
  end

  context 'when not enought dounts' do
    before do
     
    end
    it 'returns error when not enough donuts'do
     # expect(@resultFailed.errors.count).to eq 1
    end
    it 'checks donuts amount' do
     # expect(@resultFailed.errors[:error].first).to eq  I18n.t('account.not_enough_donuts')
    end
  end


  context 'when success' do
    before do
      deposit = DepositAction.call({account:   @profile.self_account, amount:  @donut.price })   
      @result = Buy.call({profile: @profile, donut_id: @donut.id})
    end

    it 'notifies admin'# do
      #expect(@resultFailed.errors[:error].first).to eq  I18n.t('account.impossible_to_self_transfer')
   # end

   it 'notifies shop tender' #do
        #expect(@resultFailed.errors[:error].first).to eq  I18n.t('account.impossible_to_self_transfer')
   # end

    it 'reduces account score' 

    it 'adds donut to profile assets' do
      assets = ProfileAsset.where(profile: @profile, donut: @donut)
      expect(assets.count).to eq 1
    end
  end

 
end
