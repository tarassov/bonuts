class CreateProfileAsset
    prepend SimpleCommand
    def initialize args
        @profile_id = args[:profile_id]
        @donut_id = args[:donut_id]    
    end

    def call
      return  create_asset
    end

    private

    def create_asset
        ActiveRecord::Base.transaction do
            if account && donut && profile
                withdrawl = CreateAccountOperation.call({account: account,amount: donut.price, direction: -1})
                if withdrawl.success?
                    profile_asset = ProfileAsset.create!({profile: profile, donut: donut})
                    unless profile_asset
                        errors.add :error,'Create asset error'
                        raise ActiveRecord::Rollback
                    end
                    return profile_asset
                else
                    erorr_text = 'Withdrawl error. '
                    error_text = erorr_text + withdrawl.errors[:error].first if withdrawl.errors[:error]
                    errors.add :error, error_text
                    raise ActiveRecord::Rollback
                end
            else
                errors.add :not_found, 'Account not found' unless account
                errors.add :not_found, 'Donut not found' unless donut
                errors.add :not_found, 'Profile not found' unless profile
                raise ActiveRecord::Rollback
            end
        end
    end

    def profile
        @profile ||= Profile.find(@profile_id)
    end

    def donut
        @donut ||= Donut.find(@donut_id)
    end

    def account
        @account ||= profile.self_account
    end

end

