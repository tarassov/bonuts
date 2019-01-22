class EventSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user, :event_date, :content, :extra_content, :id
end
