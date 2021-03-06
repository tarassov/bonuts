# frozen_string_literal: true

class TenantSerializer
  include JSONAPI::Serializer
  set_type :tenant
  set_id :id
  attributes :id, :name, :caption, :logo, :domain, :demo, :active, :test, :welcome_points, :welcome_donuts,
  :email_notification,:join_to_project_donuts,:birthday_donuts,:join_to_company_donuts,:use_departments

  attribute :attached do |tenant, params|
    tenant.user_attached(params[:user]) if params[:user]
  end
  # cache_options enabled: true, cache_length: 2.hours
end
