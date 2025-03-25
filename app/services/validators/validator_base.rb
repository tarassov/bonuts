# frozen_string_literal: true

class Validators::ValidatorBase
  include CheckingArgs
  attr_reader :profile, :tenant

  def initialize(args)
    check_errors = check_args args
    if check_errors.any?
      check_errors.each do |error|
        errors.add :error, error
      end
    end
    profile = args.fetch(:profile, nil)
    tenant = args.fetch(:tenant, nil)
    @args = args
    on_initialize args
  end

  def on_initialize args
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
