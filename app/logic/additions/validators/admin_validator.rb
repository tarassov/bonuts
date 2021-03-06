# frozen_string_literal: true

class AdminValidator < ValidatorBase
  protected

  def on_validate(profile)
    errors.add :errors, I18n.t('validator.you_have_to_be_admin') unless profile.admin
  end
end
