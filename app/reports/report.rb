# frozen_string_literal: true

class Report
  def initialize(args)
    @args = args
    @current_tenant = args[:tenant]
    @current_profile = args[:profile]
  end

  def query
    raise NotImplementedError
  end
end
