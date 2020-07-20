# frozen_string_literal: true

class AccountOperation < ApplicationRecord
  belongs_to :parent_operation, class_name: 'AccountOperation', optional: true
  belongs_to :account
  belongs_to :deal

  def self.create_withdrawl(args)
    operation = AccountOperation.create(args.merge({ direction: -1 }))
  end

  def self.create_deposit(args)
    operation = AccountOperation.create(args.merge({ direction: 1 }))
  end

  def date_string(profile)
    # zone = ActiveSupport::TimeZone.new("Moscow")
    if profile && created_at
      created_at.in_time_zone(profile.user.zone).strftime('%d/%m/%Y %H:%M')
    end
  end

  def from_profile
    if self.deal &&  ['transfer', 'share', 'Bird'].include?(self.deal.deal_type)
      if self.direction == -1
        return self.account.profile       
      else
        return self.deal.account_operations.where(direction: -1).first.account.profile if self.deal.account_operations.where(direction: -1).any?
      end  
    end
  end

  def to_profile
    if self.deal &&  ['transfer', 'share', 'Bird'].include?(self.deal.deal_type)
      if self.direction == 1
        return self.account.profile      
      else
        return self.deal.account_operations.where(direction: 1).first.account.profile if self.deal.account_operations.where(direction: 1).any?
      end  
    end
  end


  private 
  
end
