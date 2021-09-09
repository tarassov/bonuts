class PluginProperty < ApplicationRecord
  belongs_to :plugin
  has_many :plugin_settings
end
