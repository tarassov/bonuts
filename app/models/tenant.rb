class Tenant < ApplicationRecord
    has_many :profiles
    mount_uploader :logo, LogoUploader
end