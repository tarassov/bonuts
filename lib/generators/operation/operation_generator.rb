class OperationGenerator < Rails::Generators::NamedBase
  source_root File.expand_path('templates', __dir__)

  class_option :group, type: :string

  def create_operation_file
    @group_name = options[:group]
    
    generate_template "operation", "app","operations"
    generate_template "action", "app","actions","action"
    generate_template "spec", "spec","","spec"

  end

  private 
  def generate_template  template, root_folder,dir,file_sufix=nil
    if file_sufix
      file = "#{file_name}_#{file_sufix}"
    else
      file = file_name
    end  
    root_path = "#{root_folder}/logic/#{dir}"
    dir_path = root_path + ("/#{@group_name.underscore}" if @group_name.present?).to_s
    file_path = dir_path + "/#{file}.rb"

    Dir.mkdir(root_path) unless Dir.exist?(root_path)
    Dir.mkdir(dir_path) unless Dir.exist?(dir_path)

    template "#{template}.erb", file_path
  end

end
