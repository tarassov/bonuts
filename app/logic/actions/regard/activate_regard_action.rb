class ActivateRegardAction < BaseAction
  def effected_profiles
    @profiles ||= []
  end

  protected

  def do_call
    request = @args[:asset]
    @profile = @args[:profile]
    if request
      if request.status >= 1
        errors.add :not_changed, 'Already activated'
        return
      end
      request.status = 1
      request.date_used = DateTime.current
      deal = Deal.create({ profile: @profile, comment: nil, deal_type: 'activate_regard' })
      request.deals << deal
      result = request.save!
      unless result
        errors.add :not_changed, 'Something went wrong'
        return
      end
      effected_profiles << request.profile
    else
      errors.add :not_found, 'Regard not found'
      return
    end
    request
  end
end
