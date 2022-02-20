class ActionFactory
  def method_missing(method, *args)
    clazz = get_class method
    args.any? ? (clazz.new args[0]) : clazz.new
  end

  private

  def get_class(method)
    clazz = ''
    parts = method.to_s.split('_')
    parts.each do |part|
      clazz += part.capitalize
    end
    (clazz + 'Action').constantize
  end
end
