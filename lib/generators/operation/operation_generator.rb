class OperationGenerator < Rails::Generators::NamedBase
  source_root File.expand_path('templates', __dir__)

  class_option :group, type: :string

  def create_operation_file
    @group_name = options[:group]

    logic_dir_path = "app/logic"
    operation_dir_path = "/#{logic_dir_path}/operations"  + ("/#{@group_name.underscore}" if @group_name.present?).to_s
    action_dir_path ="/#{logic_dir_path}/actions"  + ("/#{@group_name.underscore}" if @group_name.present?).to_s
    
    operation_path = operation_dir_path + "/#{file_name}.rb"
    action_path = action_dir_path + "/#{file_name}_action.rb"

		Dir.mkdir(logic_dir_path) unless File.exist?(logic_dir_path)
    Dir.mkdir(operation_dir_path) unless File.exist?(operation_dir_path)
    Dir.mkdir(action_dir_path) unless File.exist?(action_dir_path)

    template "operation.erb", operation_path
    template "action.erb", action_path
  end

end
