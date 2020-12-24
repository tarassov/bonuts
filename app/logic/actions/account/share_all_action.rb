# frozen_string_literal: true

class ShareAllAction < BaseAction
  def effected_profiles
    @profiles
  end

  protected

  def do_call
    @profiles = Profile.where(tenant_id: @args[:tenant].id, active: true)
    if @args[:to_self_account] && @args[:burn_old]  
      errors.add :error, 'Operation impossible'
      return
    end  
    @profiles.each do |profile|
      if @args[:to_self_account]
        to_account = profile.self_account
      else  
       to_account = profile.distrib_account
      end 

      next unless to_account
      deal = Deal.create({profile: @args[:profile], comment: @args[:comment], deal_type: 'share'}) 
      if @args[:burn_old]
        withdrawl = WithdrawlAction.call({ account: to_account, amount: to_account.balance, direction: -1, deal: deal })
        errors.add :error, 'Withdrawl error' unless withdrawl.success?
      end
      deposit = DepositAction.call({ account: to_account, amount: @args[:amount], direction: 1,deal: deal })
      errors.add :error, 'Deposit error' unless deposit.success?
    end
    log = PublicEventAction.call({ profile: @args[:profile], content: @args[:comment] })
    errors.add :error, 'Public log error' unless log.success?
  end
end
