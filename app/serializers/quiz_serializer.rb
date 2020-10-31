class QuizSerializer
  include FastJsonapi::ObjectSerializer
  set_type :quiz
  attributes :name, :id, :active

end
