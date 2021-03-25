import React from "react"
import { Droppable } from "react-beautiful-dnd"
import { DraggableRecipeItem } from "./DraggableRecipeItem"

export const DragDropRecipeLibrary = ({recipes}) => {


    return (
        <aside>
            <h3>Recipes</h3>
            <Droppable droppableId="recipeLibrary">
                {(provided) => (
                    <div className="recipeList" ref={provided.innerRef} {...provided.droppableProps}>
                        {
                            recipes.map((recipe,index) => (
                                <DraggableRecipeItem key={recipe.id} specifier={"R"} recipe={recipe.recipe} index={index} />
                            ))
                        }
                    {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </aside>
    )
}