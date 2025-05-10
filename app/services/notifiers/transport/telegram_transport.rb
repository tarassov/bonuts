class Notifiers::Transport::TelegramTransport < Notifiers::Transport::TransportBase
  def do_send(notifier)
    return unless notifier.tenant

    unless notifier.demo && !Rails.env.development?
      notifier.addresses.each do |email|
        user = User.find_by(email: email)
        TelegramBot::Chat.send_to(user, notifier.main_text) if user.present?
      end
    end
  end
end

# frozen_string_literal: true

