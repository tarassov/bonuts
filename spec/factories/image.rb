FactoryBot.define do
  factory :image do
    uploaded_image do
      Rack::Test::UploadedFile.new(Rails.root.join('spec', 'fixtures', 'images', 'example.png'), 'image/png')
    end
    caption { 'An example image' }
  end
end
