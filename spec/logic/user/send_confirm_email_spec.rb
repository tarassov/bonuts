require 'rails_helper'

describe SendConfirmEmail do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @profileAdmin = @tenant.profiles.where(admin: true)[0]
    @profileUser = @tenant.profiles.where(admin: false)[0]
    @user = create(:user)
    @user.confirm_token = 'orginaltoken'
    @user.save
  end

  context 'when success' do
    before do
      @mails_before_count = ActionMailer::Base.deliveries.count
      @result_success = SendConfirmEmail.call({ email: @user.email })
    end

    it 'sends email' do
      expect(ActionMailer::Base.deliveries.count).to eq(@mails_before_count + 1)
    end

    it 'resets confirmation token' do
      expect(User.find(@user.id).confirm_token).not_to eq('orginaltoken')
    end

    it 'does not return error' do
      if @result_success.errors.count > 0
        errors = @result_success.errors[:error].nil? ? '' : @result_success.errors[:error].join(', ')
        forbidden = @result_success.errors[:forbidden].nil? ? '' : @result_success.errors[:forbidden].join(', ')
        message = errors + forbidden
      else
        message = ''
      end
      expect(@result_success.errors.count).to eq(0), message
    end
  end

  context 'when fails' do
    before do
      @result_fail = SendConfirmEmail.call({ email: 'wrongemail@email.com' })
    end

    it 'returns error' do
      expect(@result_fail.errors.count).to eq 1
    end
  end
end
