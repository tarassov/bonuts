# frozen_string_literal: true

module Api
  module V1
    class ProfilesController < Api::V1::ApiController
      include AbilityObsolete

      before_action :set_profile, only: [:update, :show, :set_activity]

      def index
        search_text = Profile.sanitize_sql_like(params[:search_text].downcase) if params[:search_text].present?
        profiles = Profile.search_by(search_text).includes(:circles).where(
          tenant_id: current_tenant&.id,
          active: true,
        ).and(Profile.where("bot is null or bot = false")).select("profiles.*, 0 as score_total")
        # json_response(profiles.explain)
        json_response(ProfileSerializer.new(profiles, {
          params: {
            bot: false,
          },
        }).serializable_hash.to_json)
      end

      def current
        json_response(ProfileSerializer.new(
          current_profile,
          { include: [:user], params: { show_account: true } },
        ).serializable_hash.to_json)
      end

      def set_activity
        logic_call(SetProfileActivity, { profile_to_operate: @profile, active: user_params.fetch(:active, false) })
      end

      def show
        json_response(ProfileSerializer.new(
          @profile,
          { include: [:user], params: { show_account: true } },
        ).serializable_hash.to_json)
      end

      def update
        if check_tenant(@profile)
          is_admin = @current_profile.admin?
          if is_admin || @profile.id == @current_profile.id
            ActiveRecord::Base.transaction do
              user = @profile.user
              if is_admin
                @profile.admin = user_params[:admin]
                @profile.store_admin = user_params[:store_admin]
                @profile.active = user_params[:active]
                @profile.department_id = user_params[:department_id]
                @profile.roles = user_params[:roles] # TODO: check if last admin is deleted
                @profile.in_date = user_params[:in_date]
                # user.email = user_params[:email]
              end
              user.first_name = user_params[:first_name]
              user.last_name = user_params[:last_name]
              user.email = user_params[:email]
              @profile.birthdate = user_params[:birthdate]
              @profile.position = user_params[:position]
              @profile.bio = user_params[:bio]
              @profile.contact = user_params[:contact]
              @profile.circle_ids = user_params[:circles]
              json_response(ProfileSerializer.new(@profile, { include: [:user] }).serializable_hash.to_json) if @profile.save! && user.save!
            end

          else
            render_error
          end
        end
      rescue StandardError => e
        render_error(:forbidden, e)
      end

      private

      def user_params
        params.permit(
          :id,
          :tenant,
          :admin,
          :default,
          :active,
          :first_name,
          :last_name,
          :department,
          :sex,
          :position,
          :email,
          :name,
          :store_admin,
          :bio,
          :in_date,
          :birthdate,
          :contact,
          :search_text,
          :date_from,
          :date_to,
          circles: [],
          roles: [],
        )
      end

      def profile_params; end

      def set_profile
        @profile = Profile.find(user_params[:id])
      end
    end
  end
end
