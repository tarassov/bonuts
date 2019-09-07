class ProfileSerializer
  include FastJsonapi::ObjectSerializer
  set_type :profile
  set_id :id
  attributes :active, :admin, :default,:department,:position
  attribute :first_name do |profile|
    profile.user.first_name
  end

  attribute :last_name do |profile|
    profile.user.last_name
  end

  attribute :email do |profile|
    profile.user.email
  end

  attribute :sex do |profile|
    profile.user.sex
  end

  attribute :name do |profile|
    profile.user.name
  end

  attribute :user_avatar do |object|
    object.avatar
  end

  #attribute :ranking do |object|
   # object.ranking
  #end


  attribute :score_total do |object,params|
    #object.ranking  if object.self_account && params[:show_score]

    object.score_total  if object.self_account && params[:show_score]
  end

  attribute :self_account, :distrib_account, if: Proc.new { |record, params|
  # will be serialized only if the :show_account key of params is true
    params && params[:show_account] == true
  }

  belongs_to :user
  #cache_options enabled: true, cache_length: 2.hours
end
