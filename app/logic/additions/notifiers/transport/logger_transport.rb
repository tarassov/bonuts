# frozen_string_literal: true

class LoggerTransport < TransportBase
  def do_send(notifier)
    puts "Message: #{notifier.main_text}"
  end
end
