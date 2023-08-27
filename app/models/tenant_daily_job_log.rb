# frozen_string_literal: true

class TenantDailyJobLog < ApplicationRecord
  belongs_to :tenant
end
