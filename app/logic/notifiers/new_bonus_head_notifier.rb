class NewBonusHeadNotifier < Notifier
    attr_reader :account, :account_operation
    def get_addresses
      @emails
    end
  
    def get_main_text
      "#{@name} пишет: #{@args[:comment]}"
    end
  
    def get_title
      'Обратите внимание!'
    end
  
    def get_subject
      'Ваш сотрудник получил новые баллы от коллег'
    end
  
    def get_footer
      'С уважением, Ваши Пончики'
    end
  
    protected
  
    def prepare_notification(action)
      @emails = action.effected_profiles.select{|p| p.department && p.department.head_profile}.map do |p|
         p.department.head_profile.user.email 
      end
      @name = action.action_executor.user.name
    end
  end
  