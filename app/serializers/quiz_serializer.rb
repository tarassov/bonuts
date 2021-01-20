class QuizSerializer
  include JSONAPI::Serializer
  set_type :quiz
  attributes :name, :id, :active

end
