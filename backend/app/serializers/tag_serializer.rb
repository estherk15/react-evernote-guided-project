class TagSerializer < ActiveModel::Serializer
  attributes :id, :title

  belongs_to :user
  has_many :notes
end
