class NewUserWasAddedNotifier < Notifier
  attr_reader :account, :account_operation

  def get_addresses
    @emails
  end

  def get_main_text
    "#{@executor_name} пригласил #{@name} в проект \n #{url}"
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
    profiles = Profile.where(tenant_id: @args[:tenant].id, active: true)
    @emails = profiles.select { |p| p.user.email != action.user.email }.map do |p|
      p.user.email
    end
    @name = action.user.name
    @executor_name = action.action_executor.user.name
    @url = Rails.application.config.action_mailer.default_url_options[:host] + '/event/' + action.result_event.id.to_s
  end
end
