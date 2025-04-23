class Validators::Account::TransferValidator < Validators::ValidatorBase
  def on_validate(profile)
    errors.add :error, I18n.t('account.impossible_to_self_transfer') if @args[:to_profile_ids].include?(profile.id)
  end
end
