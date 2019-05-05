#module AccountCommands

        class SendPoints
            prepend SimpleCommand
            def initialize args
                @from_profile_id = args[:from_profile_id]
                @to_profile_id = args[:to_profile_id]
                @amount = args[:amount]
                @comment = args.fetch(:comment,"")
            end

            def call
                send_points
            end

            private

            def send_points
                ActiveRecord::Base.transaction do
                    if distrib_account && to_account
                        withdrawl = CreateAccountOperation.call({account: distrib_account,amount: @amount, direction: -1})
                        if withdrawl.success?
                            deposit = CreateAccountOperation.call({account: to_account,amount: @amount, direction: 1})
                            if deposit.success?
                                #public event log
                            else
                                errors.add :error, 'Deposit error'
                                raise ActiveRecord::Rollback
                            end
                        else
                            errors.add :error, 'Withdrawl error'
                            raise ActiveRecord::Rollback
                        end
                    else
                        errors.add :not_found, 'Account not found'
                        raise ActiveRecord::Rollback
                    end
                end
            end

            def distrib_account
                @distrib_account ||= Profile.find(@from_profile_id).distrib_account
            end

            def to_account
                @to_account ||= Profile.find(@to_profile_id).self_account
            end
        end
#end
