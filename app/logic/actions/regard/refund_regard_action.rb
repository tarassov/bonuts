class RefundRegardAction < BaseAction
    def effected_profiles
        @profiles ||= []
      end
    
      protected
    
      def do_call
        profile_asset = @args[:asset]
        @profile = @args[:profile]
        @buyer_profile =  profile_asset.profile
        @buyer_account  =    @buyer_profile.self_account
        if profile_asset
          if profile_asset.status >= 1
            errors.add :not_changed, 'Already activated'
            return
          end
          profile_asset.deleted = true
          deal = Deal.create({ profile: @profile, comment: nil, deal_type: 'refund_regard' })
      
          buy_deal = profile_asset.deals.where(deal_type: 'buy').first
          amount  = AccountOperation.where(deal: buy_deal, direction: -1, account:  @buyer_account).first.amount

          deposit = DepositAction.call({ account:@buyer_account, amount: amount, direction: 1, deal: @deal})
          if deposit.success?
            profile_asset.deals << deal
            result = profile_asset.save!
            unless result
              errors.add :not_changed, 'Something went wrong'
              return
            end
          else
            error_text = deposit.errors[:error].first if deposit.errors[:error]
            errors.add :error, error_text
            return
          end
          effected_profiles << profile_asset.profile
        else
          errors.add :not_found, 'Regard not found'
          return
        end
        profile_asset
      end
end
  
   