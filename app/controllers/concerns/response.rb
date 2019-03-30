module Response
  def json_response(object, status = :ok,condition = true, fail_status = :forbidden, fail_object = {})
    if condition
      render json: object, status: status
    else
      render json: fail_object.merge(:error => true), status: fail_status
    end
  end


  def render_error(status=:forbidden, errorMessage='forbidden')
    render json: {:error => true, :errorMessage => errorMessage}, status: status
  end


end
