# frozen_string_literal: true

class ConfirmEmailNotifier < Notifier
  def addresses
    @emails
  end

  def title
    I18n.t("mailer.registration_confirmation")
  end

  def bypass_subscribe
    true
  end

  def link
    @url
  end

  def link_name
    I18n.t("mailer.confirm_registration")
  end

  def main_text
    I18n.t("mailer.new_user_welcome", name: @name)
  end

  def secondary_text
    I18n.t("mailer.click_link_bellow", url: @url)
  end

  def subject
    I18n.t("mailer.registration_confirmation")
  end

  def footer
    I18n.t("mailer.footer")
  end

  def mailer
    UserMailer
  end

  def mailer_method
    :registration_confirmation
  end

  protected

  def prepare_notification(action)
    @emails = []
    @url = Rails.application.config.action_mailer.default_url_options[:host] + "/confirm_email/" + action.user.confirm_token
    @name = action.user.first_name
    @emails << action.user.email
  end
end
