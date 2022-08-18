require 'rails_helper'
require 'rspec/expectations'
describe CreateInvitation do
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
      @result_success = CreateInvitation.call({ email: @testemail, profile: @profileAdmin, tenant: @tenant,
                                                first_name: 'Petr', last_name: 'Bush' })
    end

    it 'creates invitation ' do
      invitations = Invitation.joins(:user).where(users: { email: @testemail }, tenant: @tenant, activated: false)
      expect(invitations.count).to eq 1
    end

    it 'creates user ' do
      user = User.where(email: @testemail, first_name: 'Petr', last_name: 'Bush')
      expect(user.count).to eq 1
    end

    it ' creates user with recover token' do
      user = User.where(email: @testemail, first_name: 'Petr', last_name: 'Bush').first
      expect(user.recover_token).not_to be_nil
    end

    it 'does not return error' do
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
      @result_fail = CreateInvitation.call({ email: @testemail2, profile: @profileUser, tenant: @tenant,
                                             first_name: 'Petr', last_name: 'Bush' })
    end

    it 'returns error' do
      expect(@result_fail.errors.count).to eq 1
    end
  end
end
