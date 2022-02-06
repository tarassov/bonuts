require 'rails/generators'
class LogicGenerator < Rails::Generators::NamedBase
  source_root File.expand_path('templates', __dir__)

  class_option :group, type: :string
  class_option :only_spec, type: :boolean

  def create_operation_file
    @group_name = options[:group]
    @only_spec = options.fetch(:only_spec, false)

    generate_template 'operation', 'app', 'operations' if @only_spec == false
    generate_template 'action', 'app', 'actions', 'action' if @only_spec == false
    generate_template 'spec', 'spec', '', 'spec'
  end

  private

  def generate_template(template, root_folder, dir, file_sufix = nil)
    file = if file_sufix
             "#{file_name}_#{file_sufix}"
           else
             file_name
           end
    root_path = "#{root_folder}/logic/#{dir}"
    dir_path = root_path + ("/#{@group_name.underscore}" if @group_name.present?).to_s
    file_path = dir_path + "/#{file}.rb"

    Dir.mkdir(root_path) unless Dir.exist?(root_path)
    Dir.mkdir(dir_path) unless Dir.exist?(dir_path)

    template "#{template}.erb", file_path
  end
end
