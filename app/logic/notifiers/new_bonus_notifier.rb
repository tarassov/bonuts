class NewBonusNotifier < Notifier
  attr_reader :events
  def get_addresses
    @emails
  end

  def get_main_text
    "#{@name} пишет: #{@args[:comment]}"
  end

  def wall_message
    @args[:comment]
  end

  def get_title
    'Ура!Ура!'
  end

  def get_subject
    'Новые баллы от коллег'
  end

  def get_footer
    'С уважением, Ваши Пончики'
  end

  def message
    @args.fetch(:comment, '')
  end

  def names
    action.effected_profiles.select { |p| p.user.name }.join(', ')
  end

  def is_public
    true
  end

    protected

  def prepare_notification(action)
    @profiles = action.effected_profiles.select { |p| p != action.action_executor }.map { |p| p }
    @name = action.action_executor.user.name
    @emails = @profiles.map { |p| p.user.email }
    @events = action.action_result
  end
  end
