# frozen_string_literal: true

class OperationResponse
  attr_reader :ok, :errors, :time, :result
  def initialize(args = {})
    @errors = args[:errors]
    @time = args[:time]
    @result = args[:result]
  end

  def status
    if errors.count == 0 
      return :ok
    else
      return :bad_request
    end
  end

  def error
    return errors.any?
  end

  def message
    errors.full_messages.join(',')
  end

  def error_text
    errors.full_messages.join(',')
  end

end