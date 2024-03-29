require 'rails_helper'
require 'shared_examples'



describe  DeleteCircle do
  shared_examples "success" do |params|
    it ' do smth '

    include_examples "success logic"
  end


  before(:context) do
    @tenant = create(:tenant_with_profiles)         
    @profileAdmin = @tenant.profiles.where(:admin => true)[0]    
    @profileUser = @tenant.profiles.where(:admin => false)[0]            
  end

  context 'when success' do
    before do
      @result_success =  DeleteCircle.call({profile: @profileAdmin}) 
    end

    include_examples "success", {}
  end

  context 'when fails' do
    before do
      @result_fail = DeleteCircle.call({profile: @profileUser}) 
    end
       
    it 'returns error'do
      expect(@result_fail.errors.count).to eq 1
    end


  end
end
