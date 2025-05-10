# frozen_string_literal: true
class Notifiers::PurchaseNotifier < Notifiers::BaseNotifier
  attr_reader :account, :account_operation

  def addresses
    @emails
  end

  def main_text
    I18n.t("mailer.new_purchase_text", name: @name, donut_name: @donut_name)
  end

  def title
    I18n.t("mailer.attention")
  end

  def subject
    I18n.t("mailer.new_purchase_subject")
  end

  def footer
    I18n.t("mailer.footer")
  end

  protected

  def prepare_notification(action)
    @emails = Profile.where(tenant: @args[:tenant], store_admin: true).map do |p|
      p.user.email
    end
    @name = action.action_executor.user.name
    @donut_name = action.donut.name
  end
end
