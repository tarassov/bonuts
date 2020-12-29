class NewUserNotifier < Notifier
    attr_reader :account, :account_operation
    def get_addresses
      @emails
    end
  
    def get_main_text
        "#{@name} присоединился(лась) к проекту \n #{url}"
    end
  
    def get_title
      'Новый пользователь на пончиках'
    end
  
    def get_subject
      'Новый пользователь на пончиках'
    end
  
    def get_footer
      'С уважением, Ваши Пончики'
    end
  
    protected
  
    def prepare_notification(action)
      @args = @args.merge(tenant: action.tenant)
      profiles = Profile.where(tenant: action.tenant, active: true)
      @emails = profiles.select { |p| p != action.action_executor }.map do |p|
        p.user.email
      end
      @name = action.user.name
      @url  = Rails.application.config.action_mailer.default_url_options[:host] + "/event/" + action.result_event.id.to_s
  
    end
  end
  