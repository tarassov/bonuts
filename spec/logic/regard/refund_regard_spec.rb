require 'rails_helper'
require 'shared_examples'



describe  RefundRegard do
  shared_examples "success" do |params|
    it 'marks asset as deleted' do
      expect(Request.find(@request.id).deleted).to eq true
    end
    
    it 'return points' do
      expect(@profileUser.self_account.balance).to eq  @initialBalance+@donut.price
    end

    it 'adds refund deal to stack' do
      expect(@request.deals.where(deal_type: 'refund_regard').count).to eq 1
    end

    it 'notifies user' do
      deliveries = ActionMailer::Base.deliveries
      user_deliveries = deliveries.select { |deliver| deliver.to.include?(@profileUser.user_email) }
      expect(user_deliveries.count).to eq 1
    end

    include_examples "success logic"
  end


  before(:context) do
    @tenant = create(:tenant_with_profiles)         
    @profileAdmin = @tenant.profiles.where(:admin => true)[0]    
    @profileUser = @tenant.profiles.where(:admin => false)[0]            
  end

  context 'when success' do
    before do
      ActionMailer::Base.deliveries = []
      @store_admin = create(:profile, tenant: @tenant, store_admin: true)
      @donut = create(:donut, tenant: @tenant)
      deposit = DepositAction.call({ account: @profileUser.self_account, amount: @donut.price })
      purchase = Purchase.call({ profile: @profileUser, donut_id: @donut.id })      
      @request = purchase.response.result[0]
      @initialBalance = @profileUser.self_account.balance
      @result_success = RefundRegard.call({ asset: @request, profile: @store_admin })
    end

    include_examples "success", {}
  end

  context 'when fails' do
    before do
      @result_fail = RefundRegard.call({profile: @profileUser}) 
    end
       
    it 'returns error'do
      expect(@result_fail.errors.count).to eq 1
    end


  end
end
