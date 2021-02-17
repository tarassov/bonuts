class MattermostTransport < TransportBase
    def do_send(notifier)
      return unless  notifier.tenant 
      
      unless notifier.demo  && !Rails.env.development?
        notifier.get_addresses.each do |email|
          if Rails.env.development? 
            email = 'tarasov_al@cki.com.ru'
          end  
          MattermostJob.perform_later email,  notifier.get_main_text, @tenant.id            
        end
      end  
    end
  end
  