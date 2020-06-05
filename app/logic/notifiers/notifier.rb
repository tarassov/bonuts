# frozen_string_literal: true

class Notifier
  attr_reader :notifiers, :transports

  def initialize(args)
    @from = args[:from]
    @transports = []
    @addresses = []
    @notifiers = []
    @addresses < args[:to] if args[:to]
    @args = args
  end

  def add_transport(transport)
    @transports << transport
    transport.set_notifier self
  end

  def get_addresses
    raise NotImplementedError
  end

  def get_main_text
    raise NotImplementedError
  end

  def get_title
    raise NotImplementedError
  end

  def get_footer
    raise NotImplementedError
  end

  def get_sender
    raise NotImplementedError
  end

  def notify(action)
    prepare_notification action
    @transports.each do |transport|
      transport.send
    end
  end

  def method_missing(method, *args)
    @args[method]
  end


  protected

  def prepare_notification(action)
    raise NotImplementedError
  end
end
