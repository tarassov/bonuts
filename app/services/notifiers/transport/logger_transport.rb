# frozen_string_literal: true

class Notifiers::Transport::LoggerTransport < Notifiers::Transport::TransportBase
  def do_send(notifier)
    puts "Message: #{notifier.main_text}"
  end
end
