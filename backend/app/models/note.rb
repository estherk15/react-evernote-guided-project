class Note < ApplicationRecord
  belongs_to :user, optional: true

  # has_many :tags, through: :tag_note
end
