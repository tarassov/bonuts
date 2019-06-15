class DepartmentsController < ApiController
  include Ability

  before_action :check_admin, :only => [:create,:update,:destroy]
  before_action :set_department, :only => [:update,:destroy]

  def index
    departments  = Department.where(tenant_id: @current_tenant.id)
    json_response(DepartmentSerializer.new(departments,{}).serialized_json)
  end

  def show
    if check_tenant(@department)
      json_response(DepartmentSerializer.new(
        @department,{}).serialized_json,
        :ok,
        @department,
        :not_found
      )
    end  
  end

  def create    
    @department = Department.create!(department_params.merge(:tenant_id => @current_tenant.id))
    json_response(DepartmentSerializer.new(
      @department,{}).serialized_json,
      :created,
      @department,
      :bad_request
    )
  end

  def destroy
    if check_tenant(@department)
      json_response({ok:true},
        :ok,
        @department,
        :not_found
      )
    end  
  end

  private

  def  department_params
    params.permit(:name,:tenant_id, :id)
  end

  
  def set_department
    @depratment  = Department.find(department_params[id])
end

end
