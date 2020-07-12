# frozen_string_literal: true

class AdminValidator < ValidatorBase
  protected

  def on_validate(profile)
    unless profile.admin
      errors.add :error, I18n.t('validator.you_have_to_be_admin')
    end
  end
end
