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
    @user = User.where(email: @args[:email]).first

    # check in any invitation exsts
    if @user && Invitation.exists?(user: @user, tenant:, activated: false, closed: false)
      errors.add :error, I18n.t('invitation.invitation_exists')
      return @user
    end

    # create new user if no user exists
    @user ||= User.create!({ email: @args[:email].downcase, password: User.generate_password,
                             first_name: @args[:first_name].capitalize, last_name: @args[:last_name].capitalize, active: true, email_confirmed: @demo })
    @user.set_recover_token

    # create invitation
    @invitation = Invitation.create!({ user: @user, tenant:, from_user: profile.user,
                                       activated: false, closed: false })

    # add deal to invitation entity stack
    @invitation.deals << action_deal(:new_invitation)

    @user.save

    @invitation
  end
end
