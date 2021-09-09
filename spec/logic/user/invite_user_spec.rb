require 'rails_helper'
require 'rspec/expectations'
describe  InviteUser do
  before(:context) do
    @tenant = create(:tenant_with_profiles)         
    @profileAdmin = @tenant.profiles.where(:admin => true)[0]    
    @profileUser = @tenant.profiles.where(:admin => false)[0]    
    @testemail = 'testtest@test.ru'   
  end

  context 'when success' do
    before do
      @result_success =  InviteUser.call({email:  @testemail, profile: @profileAdmin, tenant: @tenant, first_name: 'Petr', last_name: 'Bush'}) 
    end

    it 'creates invitation ' do
      invitations = Invitation.joins(:user).where(users: {email:@testemail}, tenant: @tenant, activated: false)
      expect(invitations.count).to eq 1
    end

    it 'creates user ' do
      user = User.where(email:  @testemail,first_name: 'Petr', last_name: 'Bush')
      expect(user.count).to eq 1
    end

    it 'does not return error'do
      if @result_success.errors.count > 0 
        message =@result_success.errors[:error].join(', ')
      else
        message=''
      end
      expect(@result_success.errors.count).to eq(0), message
    end
  end

  context 'when fails' do
    before do
      @result_fail = InviteUser.call({profile: @profileUser}) 
    end
       
    it 'returns error'do
      expect(@result_fail.errors.count).to eq 1
    end


  end
end
