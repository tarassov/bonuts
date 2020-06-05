# frozen_string_literal: true

class ShareAllAction < BaseAction
  def effected_profiles
    @profiles
  end

  protected

  def do_call
    @profiles = Profile.where(tenant_id: @args[:tenant].id, active: true)

      @profiles.each do |profile|
        to_account = profile.distrib_account
        next unless to_account

        if @args[:burn_old]
          withdrawl = WithdrawlAction.call({ account: to_account, amount: to_account.balance, direction: -1 })
          unless withdrawl.success?
            errors.add :error, 'Withdrawl error'
          end
        end
        deposit = DepositAction.call({ account: to_account, amount: @args[:amount], direction: 1 })
        unless deposit.success?
          errors.add :error, 'Deposit error'
        end
      end
      log = PublicEventAction.call({ profile: @args[:profile], content: @args[:comment] })
      unless log.success?
        errors.add :error, 'Public log error'
       end
  end
end
