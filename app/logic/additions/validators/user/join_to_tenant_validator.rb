class JoinToTenantValidator < ValidatorBase
  def on_validate(profile)
    if Tenant.joins(:profiles).where(profiles: {user: profile.user}).count>0
      errors.add :error, I18n.t('tenant.tenant_already_contains_user') 
    end
  end
end
