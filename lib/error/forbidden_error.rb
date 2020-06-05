# frozen_string_literal: true

module Error
  class ForbiddenError < CustomError
    def initialize(message)
      super(:forbidden, 403, message)
    end
  end
end
