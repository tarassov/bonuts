class PurchaseAction < BaseAction

  def do_call; 
      @donut  = Donut.find(@args[:donut_id])
      @profile  = @args[:profile]
      if @donut && @profile
        @deal = Deal.create({profile: @profile, comment: nil, deal_type: 'buy'})
        withdrawl = WithdrawlAction.call({ account: @profile.self_account, amount: @donut.price, direction: -1, deal: @deal})
        if withdrawl.success?
          profile_asset = ProfileAsset.create!({ profile: @profile, donut: @donut,status: 0})
          unless profile_asset
            errors.add :error, 'Error during purchase operation'
            return
          end
          profile_asset.deals << @deal
        else
          if withdrawl.errors[:error]
            error_text = withdrawl.errors[:error].first
          end
          errors.add :error, error_text
          return
        end
      else
        errors.add :not_found, 'Donut not found' unless donut
        errors.add :not_found, 'Profile not found' unless profile
        return
      end
      return profile_asset    
  end
end

 