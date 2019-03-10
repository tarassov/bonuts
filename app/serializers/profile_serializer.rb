class ProfileSerializer
  include FastJsonapi::ObjectSerializer
  set_type :profile
  set_id :id
  attributes :active, :admin, :default

  attribute :self_account, :distrib_account, if: Proc.new { |record, params|
  # The director will be serialized only if the :admin key of params is true
  params && params[:show_account] == true
}

  belongs_to :user

  cache_options enabled: true, cache_length: 2.hours
end
