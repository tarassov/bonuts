class InvitationSerializer
  include JSONAPI::Serializer
  set_type :invitation
  set_id :id

  belongs_to :user
  belongs_to :from_user, serializer: UserSerializer
  belongs_to :tenant
  attributes :declined, :activated, :closed

  attribute :logo do |invitation|
    invitation.tenant.logo
  end
  attribute :name do |invitation|
    invitation.tenant.name
  end
  attribute :caption do |invitation|
    invitation.tenant.caption
  end
end
