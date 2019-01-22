class Api::V1::NotesController < ApplicationController
  before_action :set_note, only: [:show,:update, :updateTags, :destroy]

  def index
    notes = Note.all
    render json: notes, status: 200
  end

  def create
    # debugger
    note = Note.create(note_params)
    render json: note, status: 201
  end

  def update
    @note.update(note_params)
    render json: @note, status: 200
  end

  def destroy
    noteId = @note.id
    @note.destroy
    render json: {message:"Zap! Note deleted", noteId:noteId}
  end

  def show
    render json: @note, status: 200
  end

  def updateTags
    tagId = note_params["tag_id"].to_i
    @tag = Tag.find(tagId)
    @note.tags << @tag
  end

  private
  def note_params
    params.permit(:body, :title, :user_id, :tag_id)
  end

  def set_note
    @note = Note.find(params[:id])
  end
end
