# frozen_string_literal: true

class TelegramChat < ApplicationRecord
  belongs_to :user, optional: true
end
