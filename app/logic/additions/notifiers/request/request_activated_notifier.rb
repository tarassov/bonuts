class RequestActivatedNotifier < Notifier
  attr_reader :account, :account_operation

  def get_addresses
    @emails
  end

  def get_main_text
    I18n.t('mailer.request_activated.text', name: @name, request_name: @args[:asset].donut.name)
  end

  def get_title
    I18n.t('mailer.request_activated.title')
  end

  def get_subject
    I18n.t('mailer.request_activated.subject')
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
