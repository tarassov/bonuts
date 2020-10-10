# frozen_string_literal: true

class TransportBase
  def send
    do_send @notifier
    return errors
  end

  def set_notifier(notifier)
    @notifier = notifier
  end

  
  protected

  def errors
    @errors ||= Errors.new
  end

  def do_send(notifier)
    raise NotImplementedError
  end
end
