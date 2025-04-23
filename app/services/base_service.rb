# frozen_string_literal: true

class BaseService
  prepend SimpleCommand

  def validate_input(schema, params)
    if schema.is_a? Class
      validate_by_contract(schema, params)
    else
      validate_by_schema(schema, params)
    end
  end

  private

  def validate_by_contract(contract_class, params)
    contract = contract_class.new
    result = contract.call(params)
    if result.errors.empty?
      result.to_h
    else
      errors.add(:error, result.errors.to_h)
    end
  end

  def validate_by_schema(schema, params)
    symbolized_params = params.symbolize_keys
    result = schema.call(symbolized_params)

    if result.success?
      result.output
    else
      errors.add(:error, result.errors.to_h)
    end
  end
end


