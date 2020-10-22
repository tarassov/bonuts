class MattermostTransport < TransportBase
    def do_send(notifier)
        @tenant = notifier.args[:tenant]
    #  unless notifier.args[:tenant].demo 
        notifier.get_addresses.each do |email|
          MattermostJob.perform_later email,  notifier.get_main_text, @tenant.id            
        end
    end
  end
  