class TenantSerializer
    include FastJsonapi::ObjectSerializer
    set_type :tenant
    set_id :id
    attributes  :id, :name,:caption
  
    #cache_options enabled: true, cache_length: 2.hours
  end
  