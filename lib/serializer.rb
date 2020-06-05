# frozen_string_literal: true

module Serializer
  class DateSerializer
    def self.serialize(in_date)
      in_date&.strftime('%Y-%m-%d')
    end
  end
end
