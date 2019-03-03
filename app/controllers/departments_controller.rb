class DepartmensCOntroller < ApiController

  def index
    departments  = Department.all
    json_response(DepartmentSerializer.new(departments,{}).serialized_json)
  end

  def show
    @depratment  = Department.find(department_params[]id)
    json_response(DepartmentSerializer.new(
      @department,{}).serialized_json,
      :ok,
      @department,
      :not_found
    )
  end

  def create
    @department = Department.create!(department_params)
    json_response(DepartmentSerializer.new(
      @department,{}).serialized_json,
      :created,
      @department,
      :bad_request
    )
  end

  def delete
    @depratment  = Department.find(department_params[]id)
    json_response({ok:true}},
      :ok,
      @department,
      :not_found
    )
  end

  private

  def  department_params
    params.permit(:name,:tenant_id, :id)
  end

end
