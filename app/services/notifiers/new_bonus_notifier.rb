# frozen_string_literal: true
class Notifiers::NewBonusNotifier < Notifiers::BaseNotifier
  attr_reader :events

  def addresses
    @emails
  end

  def main_text
    "#{@name} пишет: #{@args[:comment]}"
  end

  def wall_message
    @args[:comment]
  end

  def title
    "Ура!Ура!"
  end

  def subject
    "Новые баллы от коллег"
  end

  def footer
    "С уважением, Ваши Пончики"
  end

  def message
    @args.fetch(:comment, "")
  end

  def names
    action.effected_profiles.select { |p| p.user.name }.join(", ")
  end

  def is_public
    true
  end

  protected

  def prepare_notification(action)
    @profiles = action.effected_profiles.select { |p| p != action.action_executor }.map { |p| p }
    @name = action.action_executor.user.name
    @emails = @profiles.map { |p| p.user.email }
    @events = action.events_to_generate
  end
end
