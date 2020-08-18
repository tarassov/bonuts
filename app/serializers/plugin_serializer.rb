
class PluginSerializer
    include FastJsonapi::ObjectSerializer
    set_id :id
    set_type :plugin
    attributes  :name,:id

    attribute :active do |record, params|
        if params[:tenant]
            params[:tenant].plugins.exists?(record.id) if params[:tenant]
            
        else
            false    
        end 
    end

    
  end
  