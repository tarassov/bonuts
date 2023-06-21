class UpdateDonutAction < BaseAction
  def result_event
    @donut
  end

  def args_to_check
    %i[tenant profile price name]
  end

  protected

  def do_call
    donut = Donut.find(@args.fetch(:id, nil))
    if donut
      keys_array = donut.attributes.keys
      donut_params = @args.select { |k| keys_array.include?(k) }
      @donut = Donut.update(donut_params)
    else
      errors.add :not_found, 'Donut not found'
    end
  end
end
