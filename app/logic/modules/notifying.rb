# frozen_string_literal: true

module Notifying
  def attach_notifier(notifier)
    notifiers = get_notifiers
    notifiers << notifier
  end

  def notify
    get_notifiers.each do |notifier|
      notifier.notify self
    end
  end

  def get_notifiers
    @notifiers ||= []
  end
end
