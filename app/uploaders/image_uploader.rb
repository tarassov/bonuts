# frozen_string_literal: true

class ImageUploader < CarrierWave::Uploader::Base
    # Include RMagick or MiniMagick support:
    # include CarrierWave::RMagick
    include CarrierWave::MiniMagick
  
    # !!!!!!!!!!!README - install first: sudo apt install imagemagick!!!!!!!!!!!!!!!!!
  
    # Choose what kind of storage to use for this uploader:
    storage :file
    # storage :fog
  
    # Override the directory where uploaded files will be stored.
    # This is a sensible default for uploaders that are meant to be mounted:
    def store_dir
      "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
    end
  
    # Provide a default URL as a default if there hasn't been a file uploaded:
    def default_url(*args)
    #   # For Rails 3.1+ asset pipeline compatibility:
    #   # ActionController::Base.helpers.asset_path("fallback/" + [version_name, "default.png"].compact.join('_'))
    #
    #   "/images/fallback/" + [version_name, "default.png"].compact.join('_')
      ""
    end
  
    # Process files as they are uploaded:
    process resize_to_fit: [800, 800]
    #
    # def scale(width, height)
    #  process resize_to_fit: [width, height]
    # end
  
    # Create different versions of your uploaded files:
    version :thumb do
      process resize_to_fit: [100, 100]
    end
  
    # Add a white list of extensions which are allowed to be uploaded.
    # For images you might use something like this:
    def extension_whitelist
      %w[jpg jpeg gif png bmp]
    end
  
    # Override the filename of the uploaded files:
    # Avoid using model.id or version_name here, see uploader/store.rb for details.
    def filename
      "#{secure_token(10)}.#{file.extension}" if original_filename.present?
    end
  
    protected
  
    def secure_token(length = 16)
      var = :"@#{mounted_as}_secure_token"
      model.instance_variable_get(var) || model.instance_variable_set(var, SecureRandom.hex(length / 2))
    end
  end
  