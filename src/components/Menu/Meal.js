import React, {useContext, useEffect, useState} from "react"
import { Droppable } from "react-beautiful-dnd"
import { DraggableRecipeItem } from "./DraggableRecipeItem"
import { RecipeContext } from "../Recipe/RecipeProvider"

export const Meal = ({ numDay, recipe, positionNum}) => {
    console.log(recipe)
    console.log(recipe[0].recipeId)
    const { getRecipeById } = useContext(RecipeContext)

    const [recipeById, setRecipe] = useState({})

    useEffect(() => {
        getRecipeById(recipe[0].recipeId)
        .then(setRecipe)
    },[])

    return (
        <Droppable droppableId={`Day-${numDay}-${positionNum}`}>
            {(provided) => (
                <div className="mealDayForm-container" ref={provided.innerRef} {...provided.droppableProps}>
                    
                    <DraggableRecipeItem key={recipeById.id} specifier={`Day-${numDay}-R`}recipe={recipeById} index={positionNum} />
                    
                    {provided.placeholder}
                </div>
            )}
        </Droppable>              
    )
}