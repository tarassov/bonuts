class CommentSerializer
    include FastJsonapi::ObjectSerializer
    set_type :comment
    attributes :id, :profile, :text, :created_at, :updated_at  
   #cache_options enabled: true, cache_length: 2.hours
  end
  