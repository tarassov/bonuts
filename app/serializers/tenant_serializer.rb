# frozen_string_literal: true

class TenantSerializer
  include JSONAPI::Serializer
  set_type :tenant
  set_id :id
  attributes :id,
    :name,
    :caption,
    :created_at,
    :updated_at,
    :logo,
    :domain,
    :demo,
    :active,
    :test,
    :welcome_points,
    :welcome_donuts,
    :join_to_project_donuts,
    :birthday_donuts,
    :join_to_company_donuts,
    :join_to_company_points,
    :birthday_points,
    :join_to_project_points,
    :use_departments,
    :email_notification,
    :birthday_message

  attribute :attached do |tenant, params|
    tenant.user_attached(params[:user]) if params[:user]
  end

  attribute :deactivated do |tenant, params|
    tenant.deactivated_user?(params[:user]) if params[:user]
  end
  # cache_options enabled: true, cache_length: 2.hours
end
