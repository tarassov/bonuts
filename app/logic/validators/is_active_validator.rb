class IsActiveValidator < ValidatorBase
    protected
  
    def on_validate(profile)
      unless profile.active
         errors.add :error, 'Profile is disabled'
      end
    end
  end
  