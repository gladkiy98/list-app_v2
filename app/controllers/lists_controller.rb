# frozen_string_literal: true

# List Controller
class ListsController < ApplicationController
  before_action :set_list, only: %i[update destroy]

  def index
    @lists = current_user.lists
    render json: @lists
  end

  def create
    @list = current_user.lists.create(list_params)
    if @list.save
      render json: @list, status: :created
    else
      render json: @list.errors, status: :unprocessable_entity
    end
  end

  def update
    if @list.update(list_params)
      render json: @list
    else
      render json: @list.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @list.destroy
    if @list.destroy
      render json: {}, status: 204
    else
      render json: @list.errors, status: :unprocessable_entity
    end
  end

  private

  def set_list
    @list = current_user.lists.find(params[:id])
  end

  def list_params
    params.require(:list).permit(:title)
  end
end
