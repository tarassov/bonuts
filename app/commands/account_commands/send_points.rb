#module AccountCommands

        class SendPoints
            prepend SimpleCommand
            def initialize args
                @from_profile_id = args[:from_profile_id]
                @to_profile_id = args[:to_profile_id]
                @amount = args[:amount]
                @comment = args.fetch(:comment,"")
                @notify  = args.fetch(:notify, true)
            end

            def call
                return send_points
            end

            private

            def send_points
                ActiveRecord::Base.transaction do
                    if distrib_account && to_account
                        withdrawl = CreateAccountOperation.call({account: distrib_account,amount: @amount, direction: -1, notify: @notify})
                        if withdrawl.success?
                            deposit = CreateAccountOperation.call({account: to_account,amount: @amount, direction: 1,notify: @notify})
                            if deposit.success?
                               event  = log_public deposit.result
                               unless event
                                erors.add :error, 'Event log error'
                                raise ActiveRecord::Rollback
                               end
                               return event
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

            def log_public operation
                content =  "#{from_profile.user.name}  поблагодарил #{to_profile.user.name}  за " \
                           " работу и перевел #{@amount} pts."
                
                event = Event.log_public({
                    profile: from_profile, 
                    account: to_account,
                    content: content,
                    account_operation: operation,
                    extra_content: @comment
                })

                event.profiles_to_notify.each do |profile|
                    is_receiver = profile ==event.account.profile
                    EventMailer.new_event({
                        email: profile.user.email,
                        content: event.content,
                        extra_content: event.extra_content,
                        is_receiver: is_receiver}).deliver_later  if profile && profile.user && @notify
                end

            end

            def from_profile
                @from_profile ||= Profile.find(@from_profile_id)
            end

            def to_profile
                @to_profile ||= Profile.find(@to_profile_id)
            end

            def distrib_account
                @distrib_account ||= from_profile.distrib_account
            end

            def to_account
                @to_account ||= to_profile.self_account
            end
        end
#end
