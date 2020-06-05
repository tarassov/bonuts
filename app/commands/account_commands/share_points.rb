# frozen_string_literal: true

class SharePoints
  prepend SimpleCommand

  def initialize(args)
    @amount = args[:amount]
    @to_profile_id = args[:to_profile_id]
    @from_profile_id = args.fetch(:from_profile_id, nil)
    @extra_content = args.fetch(:extra_content, '')
    @notify = args.fetch(:notify, true)
    @burn_old = args.fetch(:burn_old, false)
  end

  def call
    share_points
  end

  private

  def share_points
    ActiveRecord::Base.transaction do
      if to_account
        if @burn_old
          withdrawl = CreateAccountOperation.call({ account: to_account, amount: to_account.balance, direction: -1, extra_content: 'Списание неиспользованных баллов', notify: @notify })
          unless withdrawl.success?
            errors.add :error, 'Withdrawl error'
            raise ActiveRecord::Rollback
          end
        end
        deposit = CreateAccountOperation.call({ account: to_account, amount: @amount, direction: 1, extra_content: @extra_content, notify: @notify })
        unless deposit.success?
          errors.add :error, 'Deposit error'
          raise ActiveRecord::Rollback
        end
      else
        errors.add :error, 'Account not found'
        raise ActiveRecord::Rollback
      end
    end
  end

  def to_account
    @to_account ||= to_profile.distrib_account
  end

  def to_profile
    @to_profile ||= Profile.find(@to_profile_id)
  end
end
