class Api::V1::InvitationsController < Api::V1::ApiController
  def create
        logic_call CreateInvitation, invitations_params
  end

  def accept           
    logic_call AcceptInvitation, invitations_params
  end

  def index; 
  end

  private

  def invitations_params
    params.permit(:id, :email, :first_name, :last_name)
  end
end
