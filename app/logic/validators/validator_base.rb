# frozen_string_literal: true

class ValidatorBase
  attr_reader :profile, :tenant

  def initialize(args)
    profile = args.fetch(:profile, nil)
    tenant = args.fetch(:tenant, nil)
    @args  = args
  end

  def validate(profile)
    on_validate profile
    return errors
  end

  def errors
    @errors ||= Errors.new
  end

  protected

  def on_validate(profile)
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end
end
