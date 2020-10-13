require "uri"
require "net/http"
require "mattermost" 

class MattermostTransport < TransportBase
    def do_send(notifier)
        @tenant = notifier.args[:tenant]
    #  unless notifier.args[:tenant].demo 
        notifier.get_addresses.each do |email|
            if client           
               return nil unless my_id
               to_user = client.get_user_by_email email
               channel  = client.create_direct_channel(my_id, to_user.body["id"])
               client.create_post({channel_id: channel.body["id"], message: notifier.get_main_text})           
            end  
        end
    end


    protected    
    def my_id 
      @my_id ||= get_my_id
    end    
    
    def host
      @host ||= get_prop "host"
    end

    def key
      @key ||= get_prop "key"
    end

    def client
      @client ||= get_client
    end

    

    private 

    def get_client
      if host == nil || key == nil
       errors.add :error, "Undefined mattermost host or key"
       return nil
      end  
      m_client=Mattermost.new_client(host.value)
      m_client.use_access_token(key.value) 
      return m_client        
    end


    def get_my_id      
      me_query = client.get_me()
      if me_query.success? 
       return me_query.body["id"]
      end
      return nil
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

  end
  