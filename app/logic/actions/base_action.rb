# frozen_string_literal: true

class BaseAction
  attr_reader :users, :notifiers
  include Notifying
  include Validating
  prepend SimpleCommand

  def initialize(args)
    @args = args
    @subject  = args.fetch(:validate_subject, nil)
  end

  def call
    validate_result = validate action_executor
    if validate_result[:ok]
      ActiveRecord::Base.transaction do
        @action_result  = do_call
        unless success?
          raise ActiveRecord::Rollback
        end  
      end  
      notify if success?
    else
      validate_result[:errors].each do |key,message|
        errors.add key,message
      end
    end  
    
    action_result
  end

  def action_result
    return [] unless @action_result

    if @action_result.kind_of?(Array)
        return @action_result
    else  
        return [@action_result]
    end    
  end

  def action_executor
    @args[:profile]
  end
  # alias_method :profile, :action_executor

  def effected_profiles
    raise NotImplementedError
  end


  # alias_method :profiles_to_notify, :effected_profiles

  protected

  def do_call
    raise NotImplementedError
  end


  def add_errors in_errors
    in_errors.each do |key,message|
      errors.add key,message
    end
  end
end
