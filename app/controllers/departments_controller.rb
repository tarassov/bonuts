# frozen_string_literal: true

class DepartmentsController < ApiController
  include Ability

  before_action :check_admin, only: %i[create update destroy]
  before_action :set_department, only: %i[update destroy]
  before_action only: %i[update destroy show] do
    #  check_tenant(@department)
  end

  def index
    departments = Department.where(tenant_id: @current_tenant.id)
    json_response(DepartmentSerializer.new(departments, {}).serialized_json)
  end

  def show
    json_response(DepartmentSerializer.new(
      @department, {}
    ).serialized_json,
                  :ok,
                  @department,
                  :not_found)
  end

  def create
    @department = Department.create!(department_params.merge(tenant_id: @current_tenant.id))
    json_response(DepartmentSerializer.new(
      @department, {}
    ).serialized_json,
                  :created,
                  @department,
                  :bad_request)
  end

  def destroy
    json_response({ ok: true },
                  :ok,
                  @department,
                  :not_found)
  end

  def update
    if @department.update(update_params)
      json_response(DepartmentSerializer.new(
        @department, {}
      ).serialized_json,
                    :ok,
                    @department,
                    :not_found)
    else
      render_error :bad_request, 'department not changed'
    end
  end

  private

  def department_params
    params.permit(:name, :tenant_id, :id, :head_profile_id)
  end

  def update_params
    params.permit(:name, :head_profile_id)
  end

  def set_department
    @department = Department.find(department_params[:id])
  end
end
