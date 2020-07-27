class TenantPlugin < ApplicationRecord
    belongs_to :tenant
    belongs_to :plugin
end