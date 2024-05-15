# frozen_string_literal: true

module Api
  module V1
    class ProfileNotificationsController < Api::V1::ApiController
      before_action :set_asset, only: [:update]
      def index
        notifications = ProfileNotificationSerializer.new(ProfileNotification.accessible_by(
          ProfileNotificationAbility.new(current_profile),
          :read,
        )).serializable_hash
        json_response(notifications.to_json)
      end

      def update
        logic_call(UpdateProfileNotification, permitted_params.merge(asset: @asset, serializer_model_name: "ProfileNotification"))
      end

      private

      def permitted_params
        params.permit(:tenant, :type, :id, :active)
      end

      def set_asset
        @asset = Request.find(asset_params[:id]) if asset_params[:id]
      end
    end
  end
end
