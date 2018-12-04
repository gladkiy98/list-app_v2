# frozen_string_literal: true

# Item Controller
class ItemsController < ApplicationController
  def index
    items = Item.select(:content)
                .distinct
                .where('content LIKE ?', "%#{params[:inputValue]}%")
                .pluck(:content)
                .last(10)
    render json: items, status: :ok
  end

  def create
    item = list.items.create(item_params)
    if item.save
      render json: item, status: :created
    else
      render json: item.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if item.destroy
      render json: {}, status: :no_content
    else
      render json: item.errors, status: :unprocessable_entity
    end
  end

  private

  def item
    @item ||= Item.find(params[:id])
  end

  def list
    @list = List.find(params[:list_id])
  end

  def item_params
    params.require(:item).permit(:content)
  end
end
