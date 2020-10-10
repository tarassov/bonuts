# frozen_string_literal: true

class BaseAction
  attr_reader :users, :notifiers
  include Notifying
  include Validating
  prepend SimpleCommand

  def initialize(args)
    @args = args
    @subject = args.fetch(:validate_subject, nil)
  end

  def call
    validate_result = validate action_executor
    if validate_result[:ok]
      ActiveRecord::Base.transaction do
        @action_result = do_call
        raise ActiveRecord::Rollback unless success?
      end
      notify_errors = notify if success?
      notify_errors.each do |key, message|
        errors.add key, message
      end
    else
      validate_result[:errors].each do |key, message|
        errors.add key, message
      end
    end

    action_result
  end

  def action_result
    return [] unless @action_result
    #boxes result to array if not an array
    if @action_result.is_a?(Array)
      @action_result
    else
      [@action_result]
    end
  end

  def action_executor
    @args[:profile]
  end

  # alias_method :profile, :action_executor


  def action_tenant
    @args[:tenant]
  end

  def effected_profiles
    raise NotImplementedError
  end

  # alias_method :profiles_to_notify, :effected_profiles

  protected

  def do_call
    raise NotImplementedError
  end

  def add_errors(in_errors)
    in_errors.each do |key, message|
      errors.add key, message
    end
  end
end
