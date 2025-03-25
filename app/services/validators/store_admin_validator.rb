class Validators::StoreAdminValidator < Validators::ValidatorBase
  protected

  def on_validate(profile)
    errors.add :error, I18n.t('validator.you_have_to_be_store_admin') unless profile.store_admin || profile.admin
  end
end
