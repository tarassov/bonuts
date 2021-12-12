require 'rails_helper'

describe  JoinToTenant do
  before(:context) do
    @tenant = create(:tenant_with_profiles)         
    @user = create(:user)
    @user.email = 'pupkin@testmail.com'
    @user.save
    @profile = Profile.new({user: @user})

    @user2 = create(:user)
    @user2.email = 'pupkin@wrongmail.com'
    @user2.save
    @profile2 = Profile.new({user: @user2})

    @tenant.domain = 'testmail.com'
    @tenant.save        
  end

  context 'when success' do
    before do
      @result_success =  JoinToTenant.call({profile: @profile, tenant_name: @tenant.name}) 
    end

    it ' creates new tenant profile ' do
      profiles  = @tenant.profiles.where(user: @user)
      expect(profiles.count).to eq 1
    end 

    it 'does not return error'do
      message = if @result_success.errors.count > 0
        @result_success.errors[:error].join(', ')
      else
        ''
      end
      expect(@result_success.errors.count).to eq(0), message
    end
  end

  context 'when fails' do
    before do
      @result_fail = JoinToTenant.call({profile: @profile2, tenant: @tenant}) 
    end
       
    it 'returns error'do
      expect(@result_fail.errors.count).to eq 1
    end


  end
end
