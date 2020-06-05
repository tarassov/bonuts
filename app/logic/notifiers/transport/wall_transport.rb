# Wall transport uses events array

class WallTransport < TransportBase
  def do_send(notifier)
    notifier.events.each do |event|
      Event.create!({
                      tenant: notifier.tenant,
                      profile: event[:from_profile],
                      account: event[:account],
                      account_operation: event[:account_operation],
                      content: notifier.main_text,
                      extra_content: notifier.message,
                      event_date: DateTime.now,
                      public: notifier.is_public
                    })
      end             
   end
end
