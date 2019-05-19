class SharePoints
    prepend SimpleCommand

    def initialize args
        @amount = args[:amount]
        @to_profile_id = args[:to_profile_id]
        @from_profile_id = args.fetch(:from_profile_id, nil)        
    end

    def call
        share_points
    end

    private
    
    def share_points
        ActiveRecord::Base.transaction do
            if  to_account
                deposit = CreateAccountOperation.call({account: to_account,amount: @amount, direction: 1})
                unless deposit.success?
                    errors.add :error, 'Deposit error'
                    raise ActiveRecord::Rollback
                end            
            else
                errors.add :not_found, 'Account not found'
                raise ActiveRecord::Rollback
            end
        end 
    end

    def to_account
        @to_account ||= to_profile.distrib_account
    end

    def to_profile
        @to_profile ||= Profile.find(@to_profile_id)
    end



end