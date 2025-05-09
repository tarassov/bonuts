# frozen_string_literal: true

class Notifiers::Transport::ApiMailerTransport < Notifiers::Transport::TransportBase
  def do_send(notifier)
    # in development mode suppress email notifications from demo
    return if notifier.demo || Rails.env.development?

    notifier.addresses.each do |email|
      #  uncomment to test
      # email = "testemail@bonuts.com" if Rails.env.development?
      link = notifier.link
      link_name = notifier.link_name if link
      ApiMailerJob.perform_later({
                                   email:,
                                   secondary_text: notifier.secondary_text,
                                   main_text: notifier.main_text,
                                   from_name: I18n.t("mailer.mr_donut"),
                                   title: notifier.title,
                                   subject: notifier.subject,
                                   footer: notifier.footer,
                                   template: link ? :link_template : :default_template,
                                   bypass: notifier.bypass_subscribe,
                                   link: link,
                                   link_name: link_name,
                                 })
    end
  end
end
