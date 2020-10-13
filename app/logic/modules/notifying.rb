# frozen_string_literal: true

module Notifying
  def attach_notifier(notifier)
    notifiers = get_notifiers
    notifiers << notifier
  end

  def notify
    get_notifiers.each do |notifier|
      errors =  notifier.notify self
      notify_errors.add_errors errors 
    end
    return notify_errors
  end

  def get_notifiers
    @notifiers ||= []
  end

  protected 
  def notify_errors
    @notify_errors ||= Errors.new
  end
end
