class TenantSetting < ApplicationRecord
  belongs_to :tenant
  belongs_to :tenant_property
end
