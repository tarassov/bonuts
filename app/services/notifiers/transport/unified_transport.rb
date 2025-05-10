class Notifiers::Transport::UnifiedTransport < Notifiers::Transport::TransportBase
  def initialize(options = {})
    @use_api_email = options.fetch(:use_api_email, false)
    super()
  end

  def do_send(notifier)
    unless @use_api_email
      email = Notifiers::Transport::EmailTransport.new
      email.set_notifier(notifier)
      errors.add_errors(email.send)
    end

    if @use_api_email
      email = Notifiers::Transport::ApiMailerTransport.new
      email.set_notifier(notifier)
      errors.add_errors(email.send)
    end

    if TenantPlugin.joins(:plugin).where(active: true, plugins: { name: "mattermost" }).count > 0
      mattermost = Notifiers::Transport::MattermostTransport.new
      mattermost.set_notifier(notifier)
      errors.add_errors(mattermost.send)
    end

    if TenantPlugin.joins(:plugin).where(active: true, plugins: { name: "telegram" }).count > 0
      telegram = Notifiers::Transport::TelegramTransport.new
      telegram.set_notifier(notifier)
      errors.add_errors(telegram.send)
    end
  end
end
