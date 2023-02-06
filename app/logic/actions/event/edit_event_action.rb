# Edit event action logic
class EditEventAction < BaseAction
  def args_to_check
    %i[event content]
  end

  protected

  def do_call
    @event = @args[:event]
    content = @args[:content]

    @event.content = content
    @event.deals << action_deal(:edit_event)
    @event.save
    @event
  end
end
