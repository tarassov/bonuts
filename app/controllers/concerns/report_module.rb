module ReportModule
  def report_query(report, options)
    options = options.to_h if options.is_a?(ActionController::Parameters)
    report_object = report.new(options.merge(
      profile: current_profile,
      tenant: current_tenant,
      current_user:,
    ))
    report_object.query
  end
end
