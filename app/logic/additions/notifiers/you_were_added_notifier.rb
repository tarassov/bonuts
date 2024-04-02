class YouWereAddedNotifier < Notifier
  attr_reader :account, :account_operation

  def addresses
    @emails
  end

  def main_text
    I18n.t("mailer.invitation_welcome", executor_name: @executor_name)
  end

  def secondary_text
    I18n.t("mailer.click_link_bellow", url: @url)
  end

  def title
    I18n.t("mailer.welcome")
  end

  def link
    @url
  end

  def bypass_subscribe
    true
  end

  def link_name
    I18n.t("mailer.set_password")
  end

  def subject
    I18n.t("mailer.welcome")
  end

  def footer
    I18n.t("mailer.footer")
  end

  protected

  def prepare_notification(action)
    @emails = []
    @name = action.user.name
    @url = Rails.application.config.action_mailer.default_url_options[:host] + "/recover_password/" + action.user.recover_token
    @emails << action.user.email
    @executor_name = action.action_executor.user.name
    @url = link
  end
end
