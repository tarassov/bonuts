class ActivateRegardAction < BaseAction
  def effected_profiles
    @profiles ||= []
  end

  protected

  def do_call
    profile_asset = @args[:asset]
    @profile = @args[:profile]
    if profile_asset
      if profile_asset.status >= 1
        errors.add :not_changed, 'Already activated'
        return
      end
      profile_asset.status = 1
      profile_asset.date_used = DateTime.current
      deal = Deal.create({ profile: @profile, comment: nil, deal_type: 'activate_regard' })
      profile_asset.deals << deal
      result = profile_asset.save!
      unless result
        errors.add :not_changed, 'Something went wrong'
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
