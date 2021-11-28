class JoinToTenantGuestValidator < JoinToTenantValidator
    def on_validate(profile)
        super profile
        if !@args[:tenant].domain || @args[:tenant].domain != profile.user.domain
            errors.add :forbidden, I18n.t('tenant.join_forbidden') 
        else
        end
    end
  end
  