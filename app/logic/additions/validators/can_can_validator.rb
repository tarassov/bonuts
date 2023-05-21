class CanCanValidator < ValidatorBase
  extend ActiveSupport::Concern

  def initialize(args)
    super(args)
    @action = args[:action]
    @subject =  args[:subject]
    @model_name = @subject.is_a?(Class) ? @subject.name : @subject.class.name
  end

  protected

  def args_to_check
    %i[action subject]
  end

  def on_validate(profile)
    @profile = profile
    ability = "#{@model_name}Ability".constantize.new(@profile)
    errors.add :forbidden, I18n.t('validator.not_enough_permissions') unless ability.can? @action, @subject
  end
end
