class YouWereAddedNotifier < Notifier
  attr_reader :account, :account_operation

  def get_addresses
    @emails
  end

  def get_main_text
    "#{@executor_name} пригласил Вас в проект \n Вы можете установить пароль по этой ссылке: \n #{@url}"
  end

  def get_title
    'Добро пожаловать на проект Пончики'
  end

  def get_subject
    'Добро пожаловать на проект Пончики'
  end

  def get_footer
    'С уважением, Ваши Пончики'
  end

  protected

  def prepare_notification(action)
    profiles = Profile.where(tenant_id: action.tenant, active: true)
    @emails = []
    @name = action.user.name
    @emails << action.user.email
    @executor_name = action.action_executor.user.name
    @url = Rails.application.config.action_mailer.default_url_options[:host] + '/recover_password/' + action.user.recover_token
  end
end
