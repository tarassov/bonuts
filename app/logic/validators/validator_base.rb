# frozen_string_literal: true

class ValidatorBase
  attr_reader :profile, :tenant

  def initialize(args)
    profile = args.fetch(:profile, nil)
    tenant = args.fetch(:tenant, nil)
    @args  = args  
    on_initialize  
  end



  def validate(profile, _args = {})
    on_validate profile
    errors
  end

  def errors
    @errors ||= Errors.new
  end

  protected

  def on_validate(_profile)
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end
end
