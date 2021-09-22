class Api::V1::InvitationsController < Api::V1::ApiController
  #load_and_authorize_resource

  def create
        operation = InviteUser.call({
                                      profile: @current_profile,
                                      last_name: invitations_params[:last_name],
                                      first_name: invitations_params[:first_name],
                                      password: User.generate_password,
                                      email: invitations_params[:email]
                                    })

        response = operation.response
        if response.status != :ok
          render json: { error: response.error, message: response.message, errorText: response.error_text, result: response.result },
                 status: response.status
        else
          json_response(InvitationSerializer.new(response.result, {}).serializable_hash.to_json, :created,
                        response.result, :bad_request)
        end
  end

  def index; 
  end

  private

  def invitations_params
    params.permit(:id, :email, :first_name, :last_name)
  end
end
