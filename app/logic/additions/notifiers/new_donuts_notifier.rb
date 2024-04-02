class NewDonutsNotifier < Notifier
  attr_reader :account, :account_operation

  def addresses
    @emails
  end

  def main_text
    "#{@name} пишет: #{@args[:comment]} \n #{@url}"
  end

  def title
    "Ура!Ура!"
  end

  def wall_message
    @args[:comment]
  end

  def subject
    "Новые пончики"
  end

  def footer
    "С уважением, Ваши Пончики"
  end

  protected

  def prepare_notification(action)
    @emails = action.effected_profiles.select { |p| p != action.action_executor }.map do |p|
      p.user.email
    end
    @name = action.action_executor.user.name
    @url  = Rails.application.config.action_mailer.default_url_options[:host] + "/event/" + action.result_event.id.to_s
  end
end
