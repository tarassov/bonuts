require 'rails_helper'

RSpec.shared_examples "success logic" do |params|
  it 'does not return error' do
    if @result_success.errors.count > 0
      errors = @result_success.errors[:error].nil? ? '' : @result_success.errors[:error].join(', ')
      forbidden = @result_success.errors[:forbidden].nil? ? '' : @result_success.errors[:forbidden].join(', ')
      message = errors+forbidden
    else
      message=''
    end
    expect(@result_success.errors.count).to eq(0), message
  end
end
