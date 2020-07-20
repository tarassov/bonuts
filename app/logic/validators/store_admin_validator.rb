class StoreAdminValidator < ValidatorBase
    protected
  
    def on_validate(profile)
      unless profile.store_admin || profile.admin
        errors.add :error, I18n.t('validator.you_have_to_be_store_admin')
      end
    end
  end
  