class InfoNotifier < Notifier
  def addresses
    @emails = []
    @emails << "tarasov_al@cki.com.ru"
  end

  def main_text
    "Я  - тест."
  end

  def title
    "Привет!"
  end

  def subject
    "Тестовое пиьсмо от пончиков"
  end

  def footer
    "С уважением, Ваши Пончики"
  end

  protected

  def prepare_notification(action); end
end
