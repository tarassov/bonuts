# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Donut, type: :model do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
  end
  it "is valid with valid attributes" do
    expect(Donut.new(name: "quiz", tenant: @tenant, profile: @tenant.profiles.first)).to be_valid
  end

  it "is fails with invalid attributes" do
    expect(Donut.new(name: "quiz")).not_to  be_valid
  end
end
