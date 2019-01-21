class Api::V1::TagsController < ApplicationController
  before_action :find_tag, only: [:show,:update,:destroy]

  def index
    tags = Tag.all
    render json: tags, status: 200
  end

  def create
    # debugger
    tag = Tag.create(tag_params)
    render json: tag, status: 201
  end

  def update
    @tag.update(tag_params)
    render json: @tag, status: 200
  end

  def destroy
    tagId = @tag.id
    @tag.destroy
    render json: {message:"Tag deleted", tagId:tagId}
  end

  def show
    render json: @tag, status: 200
  end

  private
  def tag_params
    params.permit(:title)
  end

  def find_tag
    @tag = Tag.find(params[:id])
  end
end
