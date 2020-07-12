class StoreAdminValidator < ValidatorBase
    protected
  
    def on_validate(profile)
      unless profile.store_admin
        errors.add :error, I18n.t('validator.you_have_to_ be_store_admin')
      end
    end
  end
  