# frozen_string_literal: true

class Notifier
  attr_reader :notifiers, :transports, :args
  

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

  def wall_message
    return get_main_text
  end

  def get_users
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

  def mailer
     NotifyMailer
  end

  def mailer_method
    :notification
  end

  def notify(action)
    prepare_notification action
    @transports.each do |transport|
      transport_errors =  transport.send
      errors.add_errors transport_errors
    end
    return errors
  end

  def method_missing(method, *_args)
    @args[method]
  end

  def errors
    @errors ||= Errors.new
  end

  protected

  def prepare_notification(action)
    raise NotImplementedError
  end
end
