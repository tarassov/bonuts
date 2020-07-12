# frozen_string_literal: true

require 'rails_helper'

describe ActivateRegard do
  before(:context) do
 
    @tenant = create(:tenant)

  end

 


    context 'when success' do
        before do
        ActionMailer::Base.deliveries = []
        @profile = create(:profile, tenant: @tenant) 
        @store_admin = create(:profile, tenant: @tenant, store_admin: true) 
        @donut = create(:donut, tenant: @tenant)    

       # @regard = ProfileAsset.create({})
        end



        it 'activates regard'  

        it 'notfies user'

        it 'notifies boss'

    end
end
