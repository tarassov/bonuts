#module AccountCommands
    class CreateAccountOperation
        prepend SimpleCommand

        def initialize args
            @account = args[:account]
            @amount = args[:amount]
            @direction = args[:direction]
            @extra_content = args.fetch(:extra_content,"")
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
                    operation = AccountOperation.create_withdrawl({amount: @amount, account_id: @account.id})
                    event = Event.log_operation({account_operation: operation,extra_content:  @extra_content})
                    EventMailer.new_event(event).deliver_later
                else
                    errors.add :error, "Not enough points"
                end
            end
        end

        def deposit
            ActiveRecord::Base.transaction do
                operation = AccountOperation.create_deposit ({amount: @amount, account_id: @account.id})
                event = Event.log_operation({account_operation: operation,extra_content:  @extra_content})
                EventMailer.new_event(event).deliver_later
            end
        end
    end
#end
