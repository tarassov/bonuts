module Api
  module V1
    class InvitationsController < Api::V1::ApiController
      def create
        logic_call(CreateInvitation, invitations_params)
      end

      def accept
        logic_call(AcceptInvitation, invitations_params)
      end

      def decline
        logic_call(DeclineInvitation, invitations_params)
      end

      def index
        invitations = Invitation.accessible_by(Abilities::InvitationAbility.new(current_profile), :read)
        json_response(
          InvitationSerializer.new(invitations, {}).serializable_hash.to_json,
          :ok,
          invitations,
          :not_found,
          message: "Invitations not found",
        )
      end

      def my
        invitations = Invitation.accessible_by(
          Abilities::InvitationAbility.new(current_profile),
          :accept,
        ).where("(select count(*) from profiles where profiles.user_id=invitations.user_id and profiles.tenant_id = invitations.tenant_id)=0")
        json_response(
          InvitationSerializer.new(invitations, {}).serializable_hash.to_json,
          :ok,
          invitations,
          :not_found,
          message: "Invitations not found",
        )
      end

      private

      def invitations_params
        params.permit(:id, :email, :first_name, :last_name)
      end
    end
  end
end
