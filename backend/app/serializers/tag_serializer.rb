class TagSerializer < ActiveModel::Serializer
  attributes :id, :title
  
  has_many :notes
end
