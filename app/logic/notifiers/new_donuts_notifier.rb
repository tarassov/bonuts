class NewDonutsNotifier < Notifier
  attr_reader :account, :account_operation
  def get_addresses
    @emails
  end

  def get_main_text
    "#{@name} пишет: #{@args[:comment]}"
  end

  def get_title
    'Ура!Ура!'
  end

  def get_subject
    'Новые пончики'
  end

  def get_footer
    'С уважением, Ваши Пончики'
  end

  protected

  def prepare_notification(action)
    @emails = action.effected_profiles.select{|p| p !=  action.action_executor}.map do |p|
       p.user.email
    end
    @name = action.action_executor.user.name
  end
end
