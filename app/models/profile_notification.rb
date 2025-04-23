# frozen_string_literal: true

class ProfileNotification < ApplicationRecord
  belongs_to :tenant_plugin, dependent: :destroy
  belongs_to :profile, dependent: :destroy
end
