class PurchaseAction < BaseAction
  attr_reader :donut

  def do_call
    @donut = Donut.find(@args[:donut_id])
    @profile  = @args[:profile]
    if @donut && @profile
      @deal = Deal.create({ profile: @profile, comment: nil, deal_type: :buy })
      withdrawl = WithdrawlAction.call({ account: @profile.self_account, amount: @donut.price, direction: -1,
                                         deal: @deal })
      if withdrawl.success?
        profile_asset = ProfileAsset.create!({ profile: @profile, donut: @donut, status: 0 })
        unless profile_asset
          errors.add :error, 'Error during purchase operation'
          return
        end
        profile_asset.deals << @deal
        if @donut.on_stock && @donut.on_stock > 0 
          @donut.on_stock-=1
          @donut.save
        end
      else
        error_text = withdrawl.errors[:error].first if withdrawl.errors[:error]
        errors.add :error, error_text
        return
      end
    else
      errors.add :not_found, 'Donut not found' unless donut
      errors.add :not_found, 'Profile not found' unless profile
      return
    end
    profile_asset
  end
end
