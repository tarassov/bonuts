class Notifiers::Transport::UnifiedTransport < Notifiers::Transport::TransportBase
  def initialize(options = {})
    @use_api_email = options.fetch(:use_api_email, false)
    super()
  end

  def do_send(notifier)
    unless @use_api_email
      email = EmailTransport.new
      email.set_notifier(notifier)
      errors.add_errors(email.send)
    end

    if @use_api_email
      email = ApiMailerTransport.new
      email.set_notifier(notifier)
      errors.add_errors(email.send)
    end

    if TenantPlugin.joins(:plugin).where(active: true, plugins: { name: "mattermost" }).count > 0
      mattermost = MattermostTransport.new
      mattermost.set_notifier(notifier)
      errors.add_errors(mattermost.send)
    end
  end
end
