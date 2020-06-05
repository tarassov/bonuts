# frozen_string_literal: true

class EmailTransport < TransportBase
  def do_send(notifier)
    notifier.get_addresses.each do |email|
      NotifyMailer.notification({
                                  email: email,
                                  main_text: notifier.get_main_text,
                                  title: notifier.get_title,
                                  subject: notifier.get_subject,
                                  footer: notifier.get_footer
                                }).deliver_later
    end
  end
end
