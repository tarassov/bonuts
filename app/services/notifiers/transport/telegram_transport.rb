class Notifiers::Transport::TelegramTransport < Notifiers::Transport::TransportBase
  def do_send(notifier)
    return unless notifier.tenant

    unless notifier.demo && !Rails.env.development?
      notifier.addresses.each do |email|
        user = User.find_by(email: email)
        next unless user.present?
        TelegramBot::Chat.send_to(user, notifier.main_text, notifier.link) if notifier.link.present?
        TelegramBot::Chat.send_to(user, notifier.main_text) unless notifier.link.present?
      end
    end
  end
end

# frozen_string_literal: true

