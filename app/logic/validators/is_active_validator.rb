class IsActiveValidator < ValidatorBase
    protected

  def on_validate(profile)
    errors.add :error, 'Profile is disabled' unless profile.active
  end
  end
