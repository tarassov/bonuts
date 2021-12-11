require 'rails_helper'

RSpec.shared_examples "is success" do |params|

  it 'closes asset' do
    expect(ProfileAsset.find(@profile_asset.id).status).to eq 2
  end

  it 'does not return error' do
    if @result_success.errors.count > 0
      errors = @result_success.errors[:error].nil? ? '' : @result_success.errors[:error].join(', ')
      forbidden = @result_success.errors[:forbidden].nil? ? '' : @result_success.errors[:forbidden].join(', ')
      message = errors+forbidden
    else
      message=''
    end
    expect(@result_success.errors.count).to eq(0), message
  end
end


describe  CloseRegard do
  before(:context) do
    @tenant = create(:tenant_with_profiles)         
    @profileAdmin = @tenant.profiles.where(:admin => true)[0]    
    @profileUser = @tenant.profiles.where(:admin => false)[0]   
    @store_admin = create(:profile, tenant: @tenant, store_admin: true)
    @donut = create(:donut, tenant: @tenant)
  end

  context 'when success' do
    before do
      @profile_asset = ProfileAsset.create!({ profile: @profileUser, donut: @donut, status: 1 })    
      @result_success =  CloseRegard.call({profile: @profileAdmin, asset:  @profile_asset}) 
    end

    include_examples "is success", {}
  end

  context 'when store admin -  success' do
    before do
      @profile_asset = ProfileAsset.create!({ profile: @profileUser, donut: @donut, status: 1 })    
      @result_success =  CloseRegard.call({profile:  @store_admin, asset:  @profile_asset}) 
    end

    include_examples "is success", {}
  end

  context 'when fails' do
    before do
      @profile_asset = ProfileAsset.create!({ profile: @profileUser, donut: @donut, status: 1 })    
      @result_fail = CloseRegard.call({profile: @profileUser,asset:  @profile_asset}) 
    end
       
    it 'returns error'do
      expect(@result_fail.errors.count).to eq 1
    end


  end
end
