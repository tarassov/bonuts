require "uri"
require "net/http"
require "mattermost" 

class MattermostTransport < TransportBase
    def do_send(notifier)
        @tenant = notifier.args[:tenant]
    #  unless notifier.args[:tenant].demo 
        notifier.get_addresses.each do |email|

     

            if get_host.value && get_key.value            
              client=Mattermost.new_client(get_host.value)

              client.use_access_token(get_key.value) 
              client.create_post({channel_id: "n5mfstz3i3djmbzeo8ri1nj4gw", message: notifier.get_main_text})
            end  
        #   NotifyMailer.notification({
        #                               email: email,
        #                               main_text: notifier.get_main_text,
        #                               title: notifier.get_title,
        #                               subject: notifier.get_subject,
        #                               footer: notifier.get_footer
        #                             }).deliver_later
        end
      #end  
    end


    private 

    def get_host
      @host ||= get_prop "host"
    end

    def get_key
      @key ||= get_prop "key"
    end

    def get_prop name
      PluginSetting.joins(:plugin,:plugin_property, :tenant_plugin).where(
        plugins: {
          name: "mattermost"
        }, 
        tenant_plugins: {
          tenant:  @tenant
        },
        plugin_properties: {
          name: name
        }
      ).first
    end

    def get_channel
    end
  end
  