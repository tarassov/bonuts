class TenantPlugin < ApplicationRecord
  belongs_to :tenant
  belongs_to :plugin
  has_many :plugin_settings, dependent: :destroy
end
