# frozen_string_literal: true

class OperationResponse
  attr_reader :ok, :errors, :time, :result

  def initialize(args = {})
    @errors = args[:errors]
    @profile = args[:profile]
    @time = args[:time]
    @result = args[:result]
    @success_status = args.fetch(:success_status, :ok)
    @model_name = args.fetch(:serializer_model_name, nil)
  end

  def status
    if errors.count.zero?
      @success_status
    elsif !errors[:forbidden].nil? && errors[:forbidden].any?
      :forbidden
    else
      :bad_request
    end
  end

  def error
    errors.any?
  end

  def message
    errors.full_messages.join(",")
  end

  def error_text
    errors.full_messages.join(",")
  end

  def json(params = {})
    check_response  = check_result
    return check_response[:response] unless check_response[:success]

    serializer_model_name = @model_name || model_name

    return result.to_json if serializer_model_name == "Hash"

    "#{serializer_model_name}Serializer".constantize.new(
      result,
      { params: params.merge({ profile: @profile }) },
    ).serializable_hash.to_json
  end

  private

  def check_result
    json = {}.to_json if !result || (result.is_a?(Array) && result.count.zero?)
    json = JSON.generate({ error: true, message:, errorText: error_text, result: }) if error
    return { success: false, response: json } if json

    { success: true }
  end

  def model_name
    if result.is_a?(Array)
      result.first.class.name
    else
      result.class.name
    end
  end
end
