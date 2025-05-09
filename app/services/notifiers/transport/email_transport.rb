# frozen_string_literal: true
class Notifiers::Transport::EmailTransport < Notifiers::Transport::TransportBase
  def do_send(notifier)
    # email will work only in development to support mailcatcher
    return if notifier.demo && !Rails.env.development?

    notifier.addresses.each do |email|
      mailer = notifier.mailer
      sender = mailer.send(notifier.mailer_method, {
        email:,
        main_text: notifier.main_text,
        link: notifier.link,
        title: notifier.title,
        subject: notifier.subject,
        footer: notifier.footer,
      })
      begin
        sender.deliver_later
      rescue StandardError
        # Ignored
      end
    end
  end
end
