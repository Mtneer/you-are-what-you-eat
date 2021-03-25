import React from "react"
import { Draggable } from "react-beautiful-dnd"

export const DraggableRecipeItem = ({ specifier, recipe, index }) => {
    return (
        <Draggable draggableId={`${specifier}-${recipe.id}`} index={index}>
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