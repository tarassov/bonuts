class DepositAction < BaseAction
  prepend SimpleCommand

  def initialize(args)
      @account = args[:account]
      @amount = args[:amount]
      @extra_content = args.fetch(:extra_content, '')
  end

  def call
          deposit = AccountOperation.create({ amount: @amount, account_id: @account.id, direction: 1 })
          errors.add :error, "Deposit error" unless deposit
          deposit
  end

end
