require 'rails_helper'

describe Register do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
  end

  context 'when success' do
    before do
      @mails_before_count = ActionMailer::Base.deliveries.count
      @result_success = Register.call({ tenant: @tenant, email: 'test@mail.com', password: '123', first_name: 'John',
                                        last_name: 'Snow' })
    end

    it ' creates one user ' do
      expect(User.where(email: 'test@mail.com').count).to eq 1
    end

    it 'does not return error' do
      expect(@result_success.errors.count).to eq 0
    end
  end

  context 'when fails' do
    before do
      taken_email = @tenant.profiles[0].user.email
      @result_fail = Register.call({ tenant: @tenant, email: taken_email, password: '123', first_name: 'John',
                                     last_name: 'Snow' })
    end

    it 'returns error' do
      expect(@result_fail.errors.count).to eq 1
    end
  end
end
