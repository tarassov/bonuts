# frozen_string_literal: true


  module TelegramBot
    class CommandResult
      attr_reader :next_command, :next_params, :response

      def initialize(next_command, next_params, **response)
        @next_command = next_command
        @next_params = next_params
        @response = response
      end
    end
end
