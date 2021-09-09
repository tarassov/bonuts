class JoinToTenantValidator < ValidatorBase
    def on_validate(profile)
      if @args[:to_profile_ids].include?(profile.id)
        errors.add :error, I18n.t('account.impossible_to_self_transfer')
      end
    end
  end
  