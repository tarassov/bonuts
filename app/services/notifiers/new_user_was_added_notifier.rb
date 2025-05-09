# frozen_string_literal: true
class Notifiers::NewUserWasAddedNotifier < Notifiers::BaseNotifier
  attr_reader :account, :account_operation

  def addresses
    @emails
  end

  def main_text
    "#{@executor_name} пригласил #{@name} в проект \n #{url}"
  end

  def title
    "Новый пользователь на пончиках"
  end

  def subject
    "Новый пользователь на пончиках"
  end

  def footer
    "С уважением, Ваши Пончики"
  end

  protected

  def prepare_notification(action)
    profiles = Profile.select_active(@args[:tenant])
    @emails = profiles.select { |p| p.user.email != action.user.email }.map do |p|
      p.user.email
    end
    @name = action.user.name
    @executor_name = action.action_executor.user.name
    @url = Rails.application.config.action_mailer.default_url_options[:host] + "/event/" + action.result_event.id.to_s
  end
end
