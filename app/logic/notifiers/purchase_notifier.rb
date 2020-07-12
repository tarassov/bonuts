class PurchaseNotifier < Notifier
    attr_reader :account, :account_operation
    def get_addresses
      @emails
    end
  
    def get_main_text
       I18n.t('mailer.new_purchase_text', name: @name)      
    end
  
    def get_title
      I18n.t('mailer.attention')     
    end
  
    def get_subject
        I18n.t('mailer.new_purchase_subject')      
    end
  
    def get_footer
      I18n.t('mailer.footer')    
    end
  
      protected
  
    def prepare_notification(action)
      @emails = Profile.where tenant: @args[:tenant], store_admin: true
      @name = action.action_executor.user.name
    end
  end
  