class EventSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user, :date_string, :content, :extra_content, :id
end
