class RecoverPasswordAction < BaseAction
  def result_event
    @event
  end

  attr_reader :tenant, :user

  protected

  def do_call
    @user = find
    if user
      @user&.set_recover_token
      @user&.save
      { email_sent: true }
    end
  end

  private

  def find
    user = User.find_by("lower(email) = ?", @args[:email].downcase)
    return user if user

    errors.add(:error, I18n.t("not_found"))
    nil
  rescue ActiveRecord::RecordNotFound
    errors.add(:error, I18n.t("not_found"))
    nil
  end
end
