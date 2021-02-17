# Wall transport uses events array

class WallTransport < TransportBase
  def do_send(notifier)
    return unless  notifier.tenant 

    notifier.events.each do |event|
      Event.create!({
                      tenant: notifier.tenant,
                      profile: event[:from_profile],
                      account: event[:account],
                      account_operation: event[:account_operation],
                      deal: event[:deal],
                      content: notifier.wall_message,
                      extra_content: notifier.wall_message,
                      event_date: DateTime.now,
                      public: notifier.is_public
                    })
    end
 
   end
end
