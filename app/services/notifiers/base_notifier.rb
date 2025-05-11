# frozen_string_literal: true
class Notifiers::BaseNotifier
  attr_reader :notifiers, :transports, :args, :tenant

  def initialize(args)
    @from = args[:from]
    @transports = []
    @addresses = []
    @notifiers = []
    @addresses < args[:to] if args[:to]
    @args = args
    @demo_arg = args.fetch(:demo, false)
    @tenant = @args.fetch(:tenant, nil)
  end

  def bypass_subscribe
    false
  end

  def add_transport(transport)
    @transports << transport
    transport.set_notifier(self)
  end

  def addresses
    raise NotImplementedError
  end

  def wall_message
    main_text
  end

  def users
    raise NotImplementedError
  end

  def main_text
    raise NotImplementedError
  end

  def link
    @url || nil
  end

  def link_name
  end

  def title
    raise NotImplementedError
  end

  def footer
    I18n.t("mailer.footer")
  end

  def sender
    raise NotImplementedError
  end

  def mailer
    NotifyMailer
  end

  def mailer_method
    :notification
  end

  def demo
    return true if @demo_arg
    return @tenant.demo if @tenant

    false
  end

  def notify(action)
    prepare_notification(action)
    @transports.each do |transport|
      transport_errors = transport.send
      errors.add_errors(transport_errors)
    end
    errors
  end

  def method_missing(method, *_args)
    @args[method]
  end

  def respond_to_missing?(method_name, *args)
    @args.key?(method_name) || super
  end

  def errors
    @errors ||= Errors.new
  end

  protected

  def prepare_notification(action)
    raise NotImplementedError
  end
end
