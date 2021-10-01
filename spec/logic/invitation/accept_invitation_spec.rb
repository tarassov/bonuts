require 'rails_helper'
require 'rspec/expectations'
describe AcceptInvitation do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @tenant.welcome_donuts = 10
    @tenant.welcome_points = 15
    @tenant.save
    @profileAdmin = @tenant.profiles.where(admin: true)[0]
    @profileUser = @tenant.profiles.where(admin: false)[0]
    @testemail = 'testtest@test.ru'
    @testemail2 = 'testtest2@test.ru'

  end

  context 'when success' do
    before do
        @create_result  = CreateInvitation.call({ email: @testemail, profile: @profileAdmin, tenant: @tenant,
            first_name: 'Petr', last_name: 'Bush' }).result
        @invitation = @create_result.result.first    
        temp_profile  = Profile.new({user: @invitation.user})
        @result_success = AcceptInvitation.call({ profile: temp_profile, tenant: @tenant,id: @invitation.id})
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
        profiles  = Profile.joins(:user).where(users: {email: @testemail}, tenant:  @tenant)
        expect(profiles.count).to eq 1
    end

    it 'creates public event ' do
      new_profile =   Profile.joins(:user).where(users: {email: @testemail}, tenant:  @tenant).first
      events  = Event.where(profile: new_profile, tenant:  @tenant)
      expect(events.count).to eq 1
    end

    it 'creates welcome points' do
      profile  = Profile.joins(:user).where(users: {email: @testemail}, tenant:  @tenant).first
      expect(profile.self_account.balance).to eq @tenant.welcome_points
    end

    it 'creates welcome donuts' do
      profile  = Profile.joins(:user).where(users: {email: @testemail}, tenant:  @tenant).first
      expect(profile.distrib_account.balance).to eq @tenant.welcome_donuts
    end

  end

  context 'when wrong user fails' do
    before do
        @create_result  = CreateInvitation.call({ email: @testemail2, profile: @profileAdmin, tenant: @tenant,
            first_name: 'Petr2', last_name: 'Bush2' }).result
        @invitation = @create_result.result.first    
        temp_profile  = Profile.new({user:  @profileUser.user})
        @result_fail = AcceptInvitation.call({ profile: temp_profile, id: @invitation.id})
    end

    it 'returns error frobidden' do
      expect(@result_fail.errors[:forbidden].count).to eq 1
    end

    it 'returns error about same user' do
      expect(@result_fail.errors[:error].count).to eq 1
    end
  end 
  
end
