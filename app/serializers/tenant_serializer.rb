# frozen_string_literal: true

class TenantSerializer
  include JSONAPI::Serializer
  set_type :tenant
  set_id :id
  attributes :id, :name, :caption, :logo, :domain, :demo, :active, :test, :welcome_points, :welcome_donuts

  attribute :attached do |tenant, params|
    tenant.user_attached(params[:user]) if params[:user]
  end
  # cache_options enabled: true, cache_length: 2.hours
end
