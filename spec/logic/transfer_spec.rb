# frozen_string_literal: true

require 'rails_helper'

describe Transfer do
  before(:context) do
    @intial_balance = 60
    @amount = 50
    @tenant = create(:tenant_with_profiles)

    @profileFrom = @tenant.profiles.where(:admin => false)[0]
    profiles_to_select_from = @tenant.profiles.select{|p| p.id !=  @profileFrom.id && p.department && p.department.head_profile.id != p.id}
    @profile2 = profiles_to_select_from[0]      
     
  end

  context 'when not enought dounts' do
    before do
      result = DepositAction.call({account:  @profileFrom.distrib_account, amount:  @intial_balance - @profileFrom.distrib_account.balance })    

      @resultFailed = Transfer.call({
        tenant: @tenant,
        profile: @profileFrom,
        to_profile_ids: [@profile2.id],
        amount: @profileFrom.distrib_account.balance + 1,
        comment: 'Hey! thank you!',
      }) 
    end
    it 'sholud return error when not enough donuts'do
      expect(@resultFailed.errors.count).to eq 1
    end
    it 'should check donuts amount' do
      expect(@resultFailed.errors[:error].first).to eq  I18n.t('account.not_enough_donuts')
    end
  end


  context 'when tarnsfer between same user' do
    before do
      result = DepositAction.call({account:  @profileFrom.distrib_account, amount:  @intial_balance - @profileFrom.distrib_account.balance })    

      @resultFailed = Transfer.call({
        tenant: @tenant,
        profile: @profileFrom,
        to_profile_ids: [@profileFrom.id],
        amount:  @amount,
        comment: 'Hey! thank you!',
      }) 
    end

    it 'checks that receiver is not sender' do
      expect(@resultFailed.errors[:error].first).to eq  I18n.t('account.impossible_to_self_transfer')
    end
  end

  context 'when success' do    
        before(:context) do
          result = DepositAction.call({account:  @profileFrom.distrib_account, amount:  @intial_balance - @profileFrom.distrib_account.balance })    
          @resultSuccess = Transfer.call({
            tenant: @tenant,
            profile: @profileFrom,
            to_profile_ids: [@profile2.id],
            amount:  @amount,
            comment: 'Hey! thank you!',
          })    
        end
        it 'reduces user  distrib balance' do
          expect(@profileFrom.distrib_account.balance).to eq  @intial_balance - @amount
        end       

        it 'notifies receicer' do
          deliveries = ActionMailer::Base.deliveries
          receiver_deliveries = deliveries.select{|deliver| deliver.to.include?(@profile2.user_email)}
          expect(receiver_deliveries.count).to eq 1
        end

        it 'notifies receiver boss' do
          deliveries = ActionMailer::Base.deliveries
          receiver_deliveries = deliveries.select{|deliver| deliver.to.include?(@profile2.department.head_profile.user_email)}
          expect(receiver_deliveries.count).to eq 1
        end

        it 'receiver  gets  bonuses' do
          expect(@profile2.self_account.balance).to eq  @amount
        end

        it 'creates public event' do
            events = Event.where(profile:  @profileFrom, account:@profile2.self_account, public: true )
            expect(events.count).to eq  1
        end


        it 'created 2 account operation'  do
        end
      end     

      context 'when different tenant' do
        
      end

   
    context 'when user does not has department' do  
        
            before(:context) do
              result = DepositAction.call({account:  @profileFrom.distrib_account, amount:  @intial_balance - @profileFrom.distrib_account.balance })    
              @profileTo  = create(:profile, tenant: @tenant, admin: false, active: true)
               @resultSuccess = Transfer.call({
                 tenant: @tenant,
                 profile: @profileFrom,
                 to_profile_ids: [@profileTo.id],
                 amount:  @amount,
                 comment: 'Hey! thank you!',
               })    
            end

            it 'reduces user  distrib balance' do
              expect(@profileFrom.distrib_account.balance).to eq  @intial_balance - @amount
            end    
            it 'receiver  gets  bonuses' do
              expect(@profileTo.self_account.balance).to eq  @amount
            end   

            it 'notifies receicer' do
              deliveries = ActionMailer::Base.deliveries
              receiver_deliveries = deliveries.select{|deliver| deliver.to.include?(@profile2.user_email)}
              expect(receiver_deliveries.count).to eq 1
            end
      end
end
