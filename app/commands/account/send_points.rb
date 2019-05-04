class SendPoints
    prepend SimpleCommand
    def initialize from_profile_id, to_profile_id, amount, comment 
        @from_profile_id = from_profile_id
        @to_profile_id = to_profile_id
        @amount = amount
        @comment = comment
    end

    def call
    end

    private

    def send_points
        ActiveRecord::Base.transaction do
              if distrib_account && to_account
                withdrawl = CreateAccountOpertation.call(distrib_account, @amount, -1)
                if withdrawl.success?
                    deposit = CreateAccountOpertation.call(to_account, @amount, 1)
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