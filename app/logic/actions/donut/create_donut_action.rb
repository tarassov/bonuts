class CreateDonutAction < BaseAction
    def result_event
        @donut
    end

    def args_to_check
        %i[tenant profile price name]
    end

    protected
    def do_call 
        @donut = Donut.create!({
            active: @args.fetch(:active, nil), 
            name: @args.fetch(:name, nil), 
            tenant: @args[:tenant], 
            price: @args[:price], 
            profile: @args[:profile], 
            expiration_date: @args.fetch(:description, nil), 
            description: @args.fetch(:description, nil), 
            logo:  @args.fetch(:logo, nil)
            })
    end
end
  
   