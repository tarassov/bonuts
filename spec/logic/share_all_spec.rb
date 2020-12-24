# frozen_string_literal: true

require 'rails_helper'

describe ShareAll do
  before(:context) do
    @mails_before_count = ActionMailer::Base.deliveries.count
    @tenant = create(:tenant_with_profiles)
    @profileUser = @tenant.profiles.where(:admin => false)[0]
    @profileAdmin = @tenant.profiles.where(:admin => true)[0]
    @result = ShareAll.call({
                              tenant: @tenant,
                              profile:@profileUser,
                              amount: 10,
                              comment: 'test account share 1',
                              burn_old: false
                            })
    
    @resultAdmin = ShareAll.call({
      tenant: @tenant,
      profile: @profileAdmin,
      amount: 10,
      comment: 'Admin account share 1',
      burn_old: false,
      to_self_account: false
    })                            
  end

  # Фактические спецификации:
  # it 'should have 5 profiles' do
  #   profiles = Profile.where(tenant: @tenant)
  #   expect(profiles.count).to eq 11
  # end

  it 'throws error when user is not admin' do
    expect(@result.errors.count).to be > 0
  end

  it 'not throws error when user is  admin' do
    expect(@resultAdmin.errors.count).to eq  0
  end

  it 'sends emails as many as Profiles - 1' do
    profiles = Profile.where(tenant: @tenant)
    expect(ActionMailer::Base.deliveries.count).to eq  profiles.count-1 + @mails_before_count 
  end
  it 'gives user 10 donuts' do
    ditsrib_points = Profile.where(tenant: @tenant).map do |profile|
      profile.distrib_account.balance
    end    
    expect(ditsrib_points).to all(eq 10)
  end

  it 'every user should have 10 points' do
    ditsrib_points = Profile.where(tenant: @tenant).map do |profile|
      profile.distrib_account.balance
    end    
    expect(ditsrib_points).to all(eq 10)
  end

  it 'effects only current tenant' 

  context 'when burn old is true' do
    before(:context) do
      #gives initial balance for every user
      Profile.where(tenant: @tenant).each do |profile|
          DepositAction.call({account:  profile.distrib_account, amount:  rand(1..100) }) 
      end    

      @resultBurnAll = ShareAll.call({
        tenant: @tenant,
        profile:@profileAdmin,
        amount: 15,
        comment: 'burn all test',
        burn_old: true,
        to_self_account: false
      })
    end

    it 'deletes old donuts'  do
    end    

    it 'does not have errors' do
      expect(@resultBurnAll.errors.count).to eq 0
    end

    it 'gives every user 15 donuts' do
      distrib_points = Profile.where(tenant: @tenant).map do |profile|
        profile.distrib_account.balance
      end    
      expect(distrib_points).to all(eq 15)
    end
  end


end
