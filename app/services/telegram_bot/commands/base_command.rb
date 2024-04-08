# frozen_string_literal: true

module TelegramBot
  module Commands
    class BaseCommand
      attr_accessor :args, :text, :chat, :message_id, :data

      class << self
        def run(chat, args, text, data, message_id)
          new(chat, args, text, data, message_id).run
        end
      end

      def initialize(chat, args, text, data, message_id)
        @chat = chat
        @args = args
        @text = text
        @message_id = message_id
        @data = data
      end

      def run
        raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
      end
    end
  end
end
