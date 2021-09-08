class Api::V1::InvitationsController < Api::V1::ApiController
    def create
        if check_tenant(@current_profile)
            is_admin = @current_profile.admin
            if is_admin 
                operation = InviteUser.call({
                    profile: @current_profile,
                    last_name: invitations_params[:last_name],
                    first_name: invitations_params[:first_name],
                    password: User.generate_password,
                    email: invitations_params[:email],
                  })
              
                  response = operation.response
                  if (response.status != :ok)
                    render json: { error: response.error, message: response.message, errorText: response.error_text, result: response.result }, status: response.status   
                  else
                    json_response(UserSerializer.new(response.result, {}).serializable_hash.to_json, :created, response.result, :bad_request)
                  end  
            end
        end
    end

    def index
    end

    private 
    def invitations_params
        params.permit(:id, :email, :first_name, :last_name, :depratment_id)
    end
end