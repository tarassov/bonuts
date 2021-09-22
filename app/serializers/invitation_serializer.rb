
class InvitationSerializer
    include JSONAPI::Serializer
    set_type :inviatation
    set_id :id
    belongs_to :user
    belongs_to :from_user, serializer: UserSerializer
    belongs_to :tenant
  
   
end