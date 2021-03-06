class Cms::ConceptsController < ApplicationController
  before_filter :staff!

  def index
  end

  def new
    @level_2_concepts = Concept.where(parent_id: nil)
    @concepts = @level_2_concepts.map{|con| ["#{con.name} - Level 2", con.id]}
    @concept = Concept.new
  end

  def create
    @concept = Concept.new(concept_params)
    if @concept.save
      render action: 'index'
    else
      render action: 'new'
    end
  end

  private
  def concept_params
    params.require(:concept).permit(:name, :parent_id)
  end
end
