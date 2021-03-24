import React from "react"
import { Draggable } from "react-beautiful-dnd"

export const DraggableRecipeItem = ({ key, recipe, index }) => {
    return (
        <Draggable key={key} draggableId={recipe.id} index={index}>
            {(provided) => (
                <div {...provided.draggableProps} {...provided.dragHandleProps} innerRef={provided.innerRef}>
                    <h3 className="recipe__name">
                        { recipe.name }
                    </h3>
                </div>
            )}
        </Draggable>
    )
}