import React, {useContext, useEffect, useState} from "react"
import Card from 'react-bootstrap/Card'
import { Droppable } from "react-beautiful-dnd"
import { DraggableRecipeItem } from "./DraggableRecipeItem"
import { RecipeContext } from "../Recipe/RecipeProvider"

export const Meal = ({ day, recipeId, index}) => {
    const labels = ["Breakfast", "Lunch", "Dinner", "Snack"]
    
    const { getRecipeById } = useContext(RecipeContext)

    const [recipe, setRecipe] = useState({})

    useEffect(() => {
        getRecipeById(recipeId)
        .then(setRecipe)
    })

    return (
        <>
            <h5 className="meal">{labels[index]}</h5>
            <Droppable droppableId={`${day}-${index}`}>
                {(provided) => (
                    <div className="mealDayForm-container" innerRef={provided.innerRef} {...provided.droppableProps}>
                        
                        <DraggableRecipeItem key={recipe.id} recipe={recipe} index={index} />
                        
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </>                
    )    
}