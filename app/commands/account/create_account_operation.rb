class CreateAccountOperation
    prepend SimpleCommand

    def initialize account, amount, direction
        @account = account
        @amount = amount
        @direction = direction
    end

    def call
        if @direction == -1
            withdrawl
        else
            deposit
        end
    end

    private 
    def withdrawl
        ActiveRecord::Base.transaction do
            @account.lock!
            if (@account.is_available_to_withdrawl(@amount))
                operation = AccountOperation.create_withdrawl @amount, self.id, nil
                event = Event.log_by_operation(opertaion)
                EventMailer.new_event(event).deliver_later
            else
                errors.add :balance_check, "not enough poitns"       
            end
        end
    end
    def deposit
        ActiveRecord::Base.transaction do
            operation = AccountOperation.create_deposit amount, self.id, nil
            event = Event.log_by_operation(opertaion)
            EventMailer.new_event(event).deliver_later
        end
    end    
end