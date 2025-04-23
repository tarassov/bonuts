# frozen_string_literal: true

class Actions::Users::GenerateTgCode < BaseAction
  def args_to_check
    []
  end

  protected

  def do_call
    tg_code = rand(10000..99999)
    @profile.user.tg_code = tg_code

    @profile.user.save!
    tg_code
  end
end
