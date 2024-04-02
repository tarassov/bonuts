class UnifiedTransport < TransportBase
  def do_send(notifier)
    email = EmailTransport.new
    email.set_notifier(notifier)
    errors.add_errors(email.send)

    if TenantPlugin.joins(:plugin).where(active: true, plugins: { name: "mattermost" }).count > 0
      mattermost = MattermostTransport.new
      mattermost.set_notifier(notifier)
      errors.add_errors(mattermost.send)
    end
  end
end
