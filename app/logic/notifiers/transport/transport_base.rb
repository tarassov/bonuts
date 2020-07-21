# frozen_string_literal: true

class TransportBase
  def send
    do_send @notifier
  end

  def set_notifier(notifier)
    @notifier = notifier
  end

  protected

  def do_send(notifier)
    raise NotImplementedError
  end
end
