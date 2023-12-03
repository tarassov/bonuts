class RollbackRequestAction < BaseAction
  def effected_profiles
    @profiles ||= []
  end

  protected

  def do_call
    request = @args[:asset]
    @profile = @args[:profile]
    if request
      if request.status == 2
        errors.add :not_changed, 'Already closed'
        return
      end
      if request.status.zero?
        errors.add :not_changed, 'Already is incoming'
        return
      end
      request.status = 0
      request.date_used = DateTime.current
      deal = Deal.create({ profile: @profile, comment: nil, deal_type: 'rollback_request' })
      request.deals << deal
      result = request.save!
      unless result
        errors.add :not_changed, 'Something went wrong'
        return
      end
      effected_profiles << request.profile
    else
      errors.add :not_found, 'Request not found'
      return
    end
    request
  end
end
