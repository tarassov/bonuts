class Api::V1::InvitationsController < Api::V1::ApiController
  def create
     logic_call CreateInvitation, invitations_params
  end

  def accept           
    logic_call AcceptInvitation, invitations_params
  end

  def index
    invitations = Invitation.accessible_by(InvitationAbility.new(current_profile), :read)
    json_response(InvitationSerializer.new(invitations, {}).serializable_hash.to_json, :ok,invitations, :not_found, message: 'Invitations not found')
  end

  def my
    invitations = Invitation.accessible_by(InvitationAbility.new(current_profile), :accept)
    json_response(InvitationSerializer.new(invitations, {}).serializable_hash.to_json, :ok,invitations, :not_found, message: 'Invitations not found')
  end

  private

  def invitations_params
    params.permit(:id, :email, :first_name, :last_name)
  end
end
