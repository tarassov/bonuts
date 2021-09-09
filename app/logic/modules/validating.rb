# frozen_string_literal: true

module Validating
  def attach_validator(validator)
    validators = get_validators
    validators << validator
  end

  def validate(profile, _args)
    ok = true
    get_validators.each do |validator|
      errors = validator.validate profile, @args
      validate_errors.add_errors errors
    end
    { errors: validate_errors, ok: !validate_errors.any? }
  end

  def validate_errors
    @validate_errors ||= Errors.new
  end

  def get_validators
    @validators ||= []
  end
end
