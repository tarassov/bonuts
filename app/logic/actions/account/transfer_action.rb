# frozen_string_literal: true

class TransferAction < BaseAction
  attr_reader :deposit, :withdrawl

  prepend SimpleCommand

  def effected_profiles
    @profiles
  end

  def initialize(args)
    super
    @to_profile_ids = args[:to_profile_ids]
    @from_profile = args[:profile]
    @amount = args[:amount]
    @comment = args.fetch(:comment, "")
  end

  def do_call
    @profiles = []
    result = []
    distrib_account = @from_profile.distrib_account
    @to_profile_ids.each do |profile_id|
      to_profile = Profile.find(profile_id)
      @profiles << to_profile
      to_account = to_profile.self_account
      if distrib_account && to_account
        @deal = Deal.create({ profile: @from_profile, comment: @comment, deal_type: :transfer })
        @withdrawl = WithdrawlAction.call({ account: distrib_account, amount: @amount, deal: @deal })
        if @withdrawl.success?
          @deposit = DepositAction.call({ account: to_account, amount: @amount, deal: @deal })
          if @deposit.success?
            events_to_generate << {
              account_operation: @deposit.result,
              account: to_account,
              from_profile: @from_profile,
              amount: @amount,
              deal: @deal,
            }
            result << @withdrawl.result
            result << @deposit.result
          else
            add_errors(@deposit.errors)
          end
        else
          add_errors(@withdrawl.errors)
        end
      else
        errors.add(:not_found, "Account not found")
      end
    end

    result
  end
end
# end
