require 'rails_helper'
require 'shared_examples'

describe  CreateDonut do   
  shared_examples "success" do |params|
    it 'creates new donut' do
      expect(Donut.where(name: params[:name], price: params[:price], tenant: @tenant).count).to eq 1
    end
    include_examples "success logic"
  end

  
  before(:context) do
    @tenant = create(:tenant_with_profiles)         
    @profileAdmin = @tenant.profiles.where(:admin => true)[0]    
    @profileUser = @tenant.profiles.where(:admin => false)[0]          
    @profileStoreAdmin = @tenant.profiles.where(:admin => false)[1]  
    @profileStoreAdmin.store_admin = true
    @profileStoreAdmin.save
  end


  context 'when admin -  success' do
    before do
      @result_success =  CreateDonut.call({profile: @profileAdmin, name: 'NewDonut', price: 10}) 
    end
    include_examples "success", {name: "NewDonut", price: 10, tenant: @tenant}
  end

  
  context 'when store admin -  success' do
    before do
      @result_success =  CreateDonut.call({profile: @profileStoreAdmin, name: 'NewDonutS', price: 10}) 
    end
    include_examples "success", {name: "NewDonutS", price: 10, tenant: @tenant}
  end

  context 'when fails' do
    before do
      @result_fail = CreateDonut.call({profile: @profileUser,name: 'WrongDonut', price: 20}) 
    end
    it ' does not create new donut ' do
      expect(Donut.where( name: 'WrongDonut', price: 20, tenant: @tenant).count).to eq 0
    end
    it 'returns error'do
      expect(@result_fail.errors.count).to eq 1
    end


  end
end
