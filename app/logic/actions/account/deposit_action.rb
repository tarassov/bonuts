class DepositAction < BaseAction
  prepend SimpleCommand

  def initialize(args)
    @account = args[:account]
    @amount = args[:amount]
    @extra_content = args.fetch(:extra_content, '')
    @deal  = args.fetch(:deal, nil)
    unless @deal
      @deal = Deal.create({profile: nil, comment: nil, deal_type: 'deposit'})
    end
  end

  def call
    deposit = AccountOperation.create({ amount: @amount, account_id: @account.id, direction: 1,deal: @deal})
    errors.add :error, 'Deposit error' unless deposit
    deposit
  end
end
