module CheckingArgs
  # def self.included(base)
  #     base.extend ClassMethods
  #     base.overwrite_initialize
  #     base.instance_eval do
  #       def method_added(name)
  #         return if name != :initialize
  #         overwrite_initialize
  #       end
  #     end
  #   end

  #   module ClassMethods
  #     def overwrite_initialize
  #       class_eval do
  #         unless method_defined?(:custom_initialize)
  #           define_method(:custom_initialize) do |args|
  #             check_args args
  #             original_initialize args
  #           end
  #         end

  #         if instance_method(:initialize) != instance_method(:custom_initialize)
  #           alias_method :original_initialize, :initialize
  #           alias_method :initialize, :custom_initialize
  #         end
  #       end
  #     end
  # end

  def args_to_check
    []
  end

  def check_args(args = {})
    errors = []
    args_to_check.each do |argument|
      arg = args.fetch(argument, nil)
      errors << "#{argument} argument should be passed to create " + self.class.name if arg.nil?
    end
    errors
  end
end
