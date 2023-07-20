class DeleteCircleAction < BaseAction
  def args_to_check
    %i[id]
  end

  protected

  def do_call
    # check existence
    @circle = Circle.where(id: @args[:id], tenant: action_tenant).first

    # check if circle exists
    unless @circle
      errors.add :error, I18n.t('circle.circle_not_found')
      return nil
    end

    @circle.active = false
    @circle.save!
  end
end
