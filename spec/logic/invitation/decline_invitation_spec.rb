require 'rails_helper'

describe  DeclineInvitation do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @tenant.welcome_donuts = 10
    @tenant.welcome_points = 15
    @tenant.save
    @profileAdmin = @tenant.profiles.where(admin: true)[0]
    @profileUser = @tenant.profiles.where(admin: false)[0]
    @testemail = 'testtest_to_decline@test.ru'
    @testemail2 = 'testtest2@test.ru'

  end

  context 'when success' do
    before do
        @create_result  = CreateInvitation.call({ email: @testemail, profile: @profileAdmin, tenant: @tenant,
            first_name: 'Petr', last_name: 'Bush' }).result
        @invitation = @create_result.result.first    
        temp_profile  = Profile.new({user: @invitation.user})
        @result_success = DeclineInvitation.call({ profile: temp_profile, tenant: @tenant,id: @invitation.id})
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

    it 'closes invitation' do
      invitation = Invitation.find(@invitation.id)
      expect(invitation.closed).to be true
    end  

    it 'declines invitation' do
      invitation = Invitation.find(@invitation.id)
      expect(invitation.declined).to be true
    end  


    it 'does not creates profile ' do
        profiles  = Profile.joins(:user).where(users: {email: @testemail}, tenant:  @tenant)
        expect(profiles.count).to eq 0
    end 

  end

  context 'when wrong user fails' do
    before do
        @create_result  = CreateInvitation.call({ email: @testemail2, profile: @profileAdmin, tenant: @tenant,
            first_name: 'Petr2', last_name: 'Bush2' }).result
        @invitation = @create_result.result.first    
        temp_profile  = Profile.new({user:  @profileUser.user})
        @result_fail = DeclineInvitation.call({ profile: temp_profile, id: @invitation.id,tenant: @tenant})
    end

    it 'returns error frobidden' do
      expect(@result_fail.errors[:forbidden].count).to eq 1
    end

    it 'returns error about same user' do
      expect(@result_fail.errors[:error].count).to eq 1
    end
  end 
  
end
