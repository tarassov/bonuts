# frozen_string_literal: true
class Notifiers::RecoverPasswordNotifier < Notifiers::BaseNotifier
  def addresses
    @emails
  end

  def title
    nil
  end

  def bypass_subscribe
    true
  end

  def link
    @url
  end

  def link_name
    I18n.t("mailer.restore_password")
  end

  def main_text
    I18n.t("mailer.change_password")
  end

  def secondary_text
    I18n.t("mailer.click_link_bellow", url: @url)
  end

  def subject
    I18n.t("mailer.restore_password")
  end

  def footer
    I18n.t("mailer.footer")
  end

  def mailer
    UserMailer
  end

  def mailer_method
    :change_password
  end

  protected

  def prepare_notification(action)
    @emails = []
    @url = Rails.application.config.action_mailer.default_url_options[:host] + "/recover_password/" + action.user.recover_token
    @name = action.user.name
    @emails << action.user.email
  end
end
