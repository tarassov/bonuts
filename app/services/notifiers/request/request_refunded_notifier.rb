class Notifiers::Request::RequestRefundedNotifier < Notifiers::BaseNotifier
  attr_reader :account, :account_operation

  def addresses
    @emails
  end

  def main_text
    I18n.t("mailer.request_refunded.text", name: @name, request_name: @args[:asset].donut.name)
  end

  def title
    I18n.t("mailer.request_refunded.title")
  end

  def subject
    I18n.t("mailer.request_refunded.subject")
  end

  def footer
    I18n.t("mailer.footer")
  end

  protected

  def prepare_notification(action)
    @emails = action.effected_profiles.map do |p|
      p.user.email
    end
    @name = action.action_executor.user.name
  end
end
