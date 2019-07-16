class AccountOperationSerializer
    include FastJsonapi::ObjectSerializer
    set_type :account_operation
    attributes  :id, :direction,:amount,:comment

    attribute :created_at do |record, params|
    # will be serialized only if the :show_account key of params is true
       #record.date_string params[:current_profile] 
       #params[:current_profile].id
       record.date_string (params[:current_profile])
    end
  
  
    #cache_options enabled: true, cache_length: 2.hours
  end
  