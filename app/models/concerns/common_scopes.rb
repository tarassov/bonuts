# frozen_string_literal: true

module CommonScopes
  extend ActiveSupport::Concern

  def self.included(klass)
    klass.instance_eval do
      scope :active, -> { where(active: true) }
      scope :deleted, -> { where(deleted: false) }
      scope :by_tenant, ->(id) { where(tenant_id: id) }
    end
  end
end
