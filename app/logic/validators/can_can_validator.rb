class CanCanValidator < ValidatorBase
    include CanCan::Ability
    extend ActiveSupport::Concern

    def initialize(action, subject)  
        @model_name = subject.is_a?(Class) ? subject.name : subject.class.name      
        @action = action
        @subject =  subject
    end
    
   
    protected
    
    def on_validate(profile)
      @profile = profile  
      current_ability = "#{@model_name}Ability".constantize.new(@profile)
      if (!current_ability.can? @action, @subject)
        errors.add :errors, I18n.t('validator.not_enought_permissions') 
      end
    end
    included do
        rescue_from CanCan::AccessDenied do |exception|
            errors.add :errors, I18n.t('validator.not_enought_permissions') 
        end
    end
  end
  