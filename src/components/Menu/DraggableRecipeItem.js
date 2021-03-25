import React from "react"
import { Draggable } from "react-beautiful-dnd"

export const DraggableRecipeItem = ({ recipe, index }) => {
    return (
        <Draggable draggableId={recipe.id.toString()} index={index}>
            {(provided) => (
                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <h6 className="recipe__name">
                        { recipe.name }
                    </h6>
                </div>
            )}
        </Draggable>
    )
}