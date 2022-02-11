require 'rails_helper'
require 'shared_examples'



describe  RollbackRegard do
  shared_examples "success" do |params|
    it 'rollbacks request to status 0' do
      expect(Request.find(@request.id).status).to eq 0
    end

    it 'adds rollback deal to stack' do
      expect(@request.deals.where(deal_type: 'rollback_regard').count).to eq 1
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
    @store_admin = create(:profile, tenant: @tenant, store_admin: true)
    @donut = create(:donut, tenant: @tenant)          
  end

  context 'when success' do
    before do
      ActionMailer::Base.deliveries = []
      @request = Request.create!({ profile: @profileUser, donut: @donut, status: 1 })    
      @result_success =  RollbackRegard.call({profile: @profileAdmin, asset:  @request}) 
    end

    include_examples "success", {}
  end

  context 'when fails' do
    before do
      @request = Request.create!({ profile: @profileUser, donut: @donut, status: 1 })    
      @result_fail =  RollbackRegard.call({profile: @profileUser, asset:  @request}) 
    end
       
    it 'returns error'do
      expect(@result_fail.errors.count).to eq 1
    end


  end
end
