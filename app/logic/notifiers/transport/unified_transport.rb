class UnifiedTransport < TransportBase
  def do_send(notifier)     
      email = EmailTransport.new
      mattermost = MattermostTransport.new
      
      email.set_notifier notifier
      mattermost.set_notifier notifier

      errors.add_errors email.send 

      if TenantPlugin.joins(:plugin).where(active: true,plugins: {name: "mattermost"} ).count > 0
        errors.add_errors mattermost.send
      end  
   
  end
end
