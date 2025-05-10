# frozen_string_literal: true
class Notifiers::NewUserNotifier < Notifiers::BaseNotifier
  attr_reader :account, :account_operation

  def addresses
    @emails
  end

  def main_text
    "#{@name} присоединился(лась) к проекту \n #{url}"
  end

  def title
    "Новый пользователь на пончиках"
  end

  def subject
    "Новый пользователь на пончиках"
  end

  protected

  def prepare_notification(action)
    profiles = Profile.select_active(action.tenant)
    @emails = profiles.select { |p| p != action.action_executor }.map do |p|
      p.user.email
    end
    @name = action.user.name
    @url = Rails.application.config.action_mailer.default_url_options[:host] + "/event/" + action.result_event.id.to_s if action.result_event
  end
end
