require 'rails_helper'
require 'rspec/expectations'
describe AcceptInvitation do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @tenant2 = create(:tenant_with_profiles)
    @profileAdmin = @tenant.profiles.where(admin: true)[0]
    @profileUser = @tenant.profiles.where(admin: false)[0]
    @testemail = 'testtest@test.ru'
    @testemail2 = 'testtest2@test.ru'
    @testemail3 = 'testtest3@test.ru'
  end

  context 'when success' do
    before do
        @create_result  = CreateInvitation.call({ email: @testemail, profile: @profileAdmin, tenant: @tenant,
            first_name: 'Petr', last_name: 'Bush' }).result
        @invitation = @create_result.result.first    
        new_profile  = Profile.new({user: @invitation.user, tenant: @tenant})
        @result_success = AcceptInvitation.call({ profile: new_profile, invitation_id: @invitation.id})
    end

    it 'does not return error' do
        message = if @result_success.errors.count > 0
                    @result_success.errors[:error].join(', ')
                  else
                    ''
                  end
        expect(@result_success.errors.count).to eq(0), message
      end

    it 'creates profile ' do
        profiles  = Profile.joins(:user).where(users: {email: @testemail} )
        expect(profiles.count).to eq 1
    end

   
  end

  context 'when wrong user fails' do
    before do
        @create_result  = CreateInvitation.call({ email: @testemail, profile: @profileAdmin, tenant: @tenant,
            first_name: 'Petr', last_name: 'Bush' }).result
        @invitation = @create_result.result.first    
        new_profile  = Profile.new({user:  @profileUser.user, tenant: @tenant})
        @result_fail = AcceptInvitation.call({ profile: new_profile, invitation_id: @invitation.id})
    end

    it 'returns error' do
      expect(@result_fail.errors.count).to eq 1
    end
  end 
  
end
