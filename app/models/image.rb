# frozen_string_literal: true

class Image < ApplicationRecord
    belongs_to :imageable, polymorphic: true

    mount_uploader :image, ImageUploader
end
  