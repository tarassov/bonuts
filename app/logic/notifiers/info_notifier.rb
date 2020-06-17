class InfoNotifier < Notifier
  def get_addresses
    @emails = []
    @emails << 'tarasov_al@cki.com.ru'
  end

  def get_main_text
    'Я  - тест.'
  end

  def get_title
    'Привет!'
  end

  def get_subject
    'Тестовое пиьсмо от пончиков'
  end

  def get_footer
    'С уважением, Ваши Пончики'
  end

    protected

  def prepare_notification(action); end
  end
