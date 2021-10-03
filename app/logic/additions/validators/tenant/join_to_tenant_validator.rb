class JoinToTenantValidator < ValidatorBase
  def on_validate(profile)
    if @args[:tenant].profiles.where(user: profile.user).count>0
      errors.add :error, I18n.t('tenant.tenant_already_contains_user') 
    end
  end

  def args_to_check
    %i[tenant]
  end
end
