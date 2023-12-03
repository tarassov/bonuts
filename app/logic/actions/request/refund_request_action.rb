class RefundRequestAction < BaseAction
  def effected_profiles
    @profiles ||= []
  end

  protected

  def do_call
    request = @args[:asset]
    @profile = @args[:profile]
    @buyer_profile = request.profile
    @buyer_account = @buyer_profile.self_account
    if request
      if request.status >= 1
        errors.add :not_changed, 'Already activated'
        return
      end
      request.deleted = true
      deal = Deal.create({ profile: @profile, comment: nil, deal_type: 'refund_request' })

      buy_deal = request.deals.where(deal_type: 'buy').first
      amount  = AccountOperation.where(deal: buy_deal, direction: -1, account: @buyer_account).first!.amount

      deposit = DepositAction.call({ account: @buyer_account, amount:, direction: 1, deal: })
      if deposit.success?
        request.deals << deal
        result = request.save!
        unless result
          errors.add :not_changed, 'Something went wrong'
          return
        end
      else
        error_text = deposit.errors[:error].first if deposit.errors[:error]
        errors.add :error, error_text
        return
      end
      effected_profiles << request.profile
    else
      errors.add :not_found, 'Request not found'
      return
    end
    request
  end
end
