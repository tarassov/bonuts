require 'rails_helper'

describe AdminDeposit do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @profileAdmin = @tenant.profiles.where(admin: true)[0]
    @profileUser = @tenant.profiles.where(admin: false)[0]
  end

  context 'when success' do
    before do
      @old_balance = @profileUser.self_account.balance
      @result_success = AdminDepositAction.call({ profile: @profileAdmin, to_profile_ids: [@profileUser.id], amount: 10,
                                            account_type: 'self' })
    end
    it 'adds points to user ' do
      expect(@profileUser.self_account.balance).to eq @old_balance + 10
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

  context 'when distrib deposit success' do
    before do
      @old_balance = @profileUser.distrib_account.balance
      @result_success = AdminDepositAction.call({ profile: @profileAdmin, to_profile_ids: [@profileUser.id], amount: 10,
                                            account_type: 'distrib' })
    end
    it 'adds points to user ' do
      expect(@profileUser.distrib_account.balance).to eq @old_balance + 10
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
      @result_fail = AdminDeposit.call({ profile: @profileUser, to_profile_ids: [@profileUser.id], amount: 10,
                                         account_type: 'distrib' })
    end

    it 'returns error' do
      expect(@result_fail.errors.count).to eq 1
    end
  end
end
