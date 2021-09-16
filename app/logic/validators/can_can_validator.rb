class CanCanValidator < ValidatorBase
    include CanCan::Ability
    extend ActiveSupport::Concern

    def initialize(action, subject)  
        @model_name = subject.is_a?(Class) ? subject.name : subject.class.name      
        @action = action
        @subject =  subject
    end
    
    def current_ability
        @current_ability ||= "#{@model_name}Ability".constantize.new(@profile)
    end

    protected
    #can? actions, subjects
    def on_validate(profile)
      @profile = profile  
      can? @action, @subject
      errors.add :errors, I18n.t('validator.you_have_to_be_admin') unless profile.admin #remove obsolete admin check
    end
    included do
        rescue_from CanCan::AccessDenied do |exception|
            errors.add :errors, I18n.t('validator.not_enought_permissions') 
        end
    end
  end
  