module Serializer
  class  DateSerializer
    def self.serialize(in_date)
      in_date.strftime("%Y-%m-%d") if in_date
    end

  end
end
