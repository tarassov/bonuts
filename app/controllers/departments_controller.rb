class DepartmensCOntroller<<ApiController

  def index
    departments  = Department.all
    json_response(DepartmentSerializer.new(departments,{}).serialized_json)
  end

  def show
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
  end

  private

  def  department_params
    params.permit(:name,:tenant_id)
  end

end
