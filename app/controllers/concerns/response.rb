module Response
  def json_response(object, status = :ok,condition = true, fail_status = :forbidden, fail_object = {})
    if condition
      render json: object, status: status
    else
      render json: fail_object, status: fail_status
    end  
  end


end
