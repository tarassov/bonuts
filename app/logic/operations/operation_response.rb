# frozen_string_literal: true

class OperationResponse
  attr_reader :ok, :errors, :time, :result

  def initialize(args = {})
    @errors = args[:errors]
    @time = args[:time]
    @result = args[:result]
    @success_status = args.fetch(:success_status, :ok)
    @model_name = args.fetch(:serializer_model_name, nil)
  end

  def status
    if errors.count == 0
      @success_status         
    elsif errors[:forbidden] !=nil &&  errors[:forbidden].any?
      :forbidden
    else
      :bad_request
    end
  end

  def error
    errors.any?
  end

  def message
    errors.full_messages.join(',')
  end

  def error_text
    errors.full_messages.join(',')
  end

  def json params = {} 
    if self.error
      return JSON.generate({ error: self.error, message: self.message, errorText: self.error_text, result: self.result })
    else
      return {}.to_json if !self.result
      
      if (@model_name ==nil)#if model name is not overrided
        if self.result.is_a? Array
          return {}.to_json if self.result.count == 0
          @model_name = self.result.first.class.name     
        else
          @model_name = self.result.class.name     
        end
      end

      serializer = "#{@model_name}Serializer".constantize
      
      return serializer.new(self.result, params).serializable_hash.to_json
    end
  end
  
end
