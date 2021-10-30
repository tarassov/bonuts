require 'rails_helper'

describe  CreateDonut do
  before(:context) do
    @tenant = create(:tenant_with_profiles)         
    @profileAdmin = @tenant.profiles.where(:admin => true)[0]    
    @profileUser = @tenant.profiles.where(:admin => false)[0]            
  end

  context 'when success' do
    before do
      @result_success =  CreateDonut.call({profile: @profileAdmin}) 
    end
    it ' do smth '

    it 'does not return error'do
      expect(@result_success.errors.count).to eq(0), @result_success.errors[:error].join(', ')
    end
  end

  context 'when fails' do
    before do
      @result_fail = CreateDonut.call({profile: @profileUser}) 
    end
       
    it 'returns error'do
      expect(@result_fail.errors.count).to eq 1
    end


  end
end
