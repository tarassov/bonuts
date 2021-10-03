class CreateInvitationAction < BaseAction
    attr_reader :user
  
    def result_event
      @invitation
    end

    def args_to_check
      %i[email first_name last_name]
    end
  
    protected
  
    def do_call
      @demo = tenant.demo
      # find user if user exists
      @user = User.where(email: @args[:email], demo: @demo).first
  
      # check in any invitation exsts
      if @user && Invitation.exists?(user: @user, tenant: tenant, activated: false)
        errors.add :error, I18n.t('invitation.invitation_exists')
        return @user
      end
  
      # create new user if no user exists
      @user ||= User.create!({ email: @args[:email], password: User.generate_password,
                               first_name: @args[:first_name], last_name: @args[:last_name], active: true })
      @user.set_recover_token 
  
      # create invitation
      @invitation = Invitation.create!({ user: @user, tenant: tenant, from_user: profile.user,
                                         activated: false })
  
      # add deal to invitation entity stack
      @invitation.deals << action_deal('new invitation')
  
      @user.demo = @demo
      @user.active = @demo
      @user.email_confirmed = @demo
  
      @user.save
  
      @invitation
    end
  end
  