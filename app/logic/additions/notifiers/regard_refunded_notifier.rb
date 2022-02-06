class RegardRefundedNotifier < Notifier
    attr_reader :account, :account_operation
  
    def get_addresses
      @emails
    end
  
    def get_main_text
      I18n.t('mailer.regard_refunded.text', name: @name, regard_name: @args[:asset].donut.name)
    end
  
    def get_title
      I18n.t('mailer.regard_refunded.title')
    end
  
    def get_subject
      I18n.t('mailer.regard_refunded.subject')
    end
  
    def get_footer
      I18n.t('mailer.footer')
    end
  
    protected
  
    def prepare_notification(action)
      @emails = action.effected_profiles.map do |p|
        p.user.email
      end
      @name = action.action_executor.user.name
    end
  end
  