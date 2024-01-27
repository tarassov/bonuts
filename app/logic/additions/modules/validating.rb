# frozen_string_literal: true

module Validating
  def attach_validator(validator)
    validators << validator
  end

  def validate(profile)
    validators.each do |validator|
      errors = validator.validate(profile, @args)
      validate_errors.add_errors errors
    end
    { errors: validate_errors, ok: validate_errors.none? }
  end

  def validate_errors
    @validate_errors ||= Errors.new
  end

  def validators
    @validators ||= []
  end
end
