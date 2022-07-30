# frozen_string_literal: true

class BaseAction
  attr_reader :users, :notifiers, :profile, :tenant, :events_to_generate

  include Notifying
  include Validating
  include CheckingArgs
  prepend SimpleCommand

  def initialize(args)
    @args = args
    check_errors = check_args args
    if check_errors.any?
      check_errors.each do |error|
        errors.add :error, error  
      end
    end  
    @subject = args.fetch(:validate_subject, nil)
    @profile = args.fetch(:profile, nil)
    @tenant = args.fetch(:tenant, nil)
    @events_to_generate = []
  end

  def call
    validate_result = validate action_executor
    if validate_result[:ok]
      ActiveRecord::Base.transaction do
        @action_result = do_call
        raise ActiveRecord::Rollback unless success?
      end
      if success?
        notify_errors = notify
        notify_errors.each do |key, message|
          errors.add key, message
        end
      end
    else
      validate_result[:errors].each do |key, message|
        errors.add key, message
      end
    end

    action_result
  rescue StandardError => e
    errors.add :error, e.message
  end

  def action_result
    return [] unless @action_result

    # boxes result to array if not an array
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

  def action_deal deal_type, comment = nil    
    @deal ||= Deal.create({ profile:  @profile , comment: comment, deal_type: deal_type })
  end


  def do_call
    raise NotImplementedError
  end

  def add_errors(in_errors)
    in_errors.each do |key, message|
      errors.add key, message
    end
  end
end
