class WithdrawlAction < BaseAction
  prepend SimpleCommand

  def initialize(args)
    @account = args[:account]
    @amount = args[:amount]
    @extra_content = args.fetch(:extra_content, '')
    @deal  = args[:deal]
  end

  def call
    @account.lock!
    if @account.is_available_to_withdrawl(@amount)
      AccountOperation.create({ amount: @amount, account_id: @account.id, direction: -1,deal: @deal })
    else
      errors.add :error, I18n.t('account.not_enough_donuts')
    end
  end
end
