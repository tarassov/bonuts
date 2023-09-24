# frozen_string_literal: true

class EmailTransport < TransportBase
  def do_send(notifier)
    # in development mode suppress email notifications from demo
    return if notifier.demo && !Rails.env.development?

    notifier.get_addresses.each do |email|
      mailer = notifier.mailer
      sender = mailer.send notifier.mailer_method, {
        email:,
        main_text: notifier.get_main_text,
        title: notifier.get_title,
        subject: notifier.get_subject,
        footer: notifier.get_footer
      }
      begin
        sender.deliver_later
      rescue StandardError
        # Ignored
      end
    end
  end
end
