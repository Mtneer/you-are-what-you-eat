import React from "react"
import Card from 'react-bootstrap/Card'
import { Droppable } from "react-beautiful-dnd"
import { Meal } from "./Meal"

export const Menu = ({ numDay, dayRecipes}) => {
    const labels = ["Breakfast", "Lunch", "Dinner", "Snack"]
    console.log(dayRecipes)
    
    return (
        <Card className="menu-card">
            <Card.Body>
                <Card.Title>{`Day-${numDay}`}</Card.Title>
                <div className="dayForm-container">
                    {Array.from({length: 4}, (_, index) => index + 1).map((positionNum) => {
                        
                        const recipe = dayRecipes.filter(dayRecipe => {
                            if (dayRecipe.position === positionNum) {
                                console.log(dayRecipe)
                                return dayRecipe
                            }
                        })

                        if (recipe.length > 0) {
                            return (
                                <>
                                    <h5 className="meal">{labels[positionNum-1]}</h5>
                                    <Meal key={`R-${positionNum}`} numDay={numDay} recipe={recipe} positionNum={positionNum} />   
                                </>     
                            )
                        } else {
                            return (
                                <>
                                <h5 className="meal">{labels[positionNum-1]}</h5>
                                <Droppable droppableId={`Day-${numDay}-P-${positionNum}`}>
                                    {(provided) => (
                                        <div className="mealDayForm-container" ref={provided.innerRef} {...provided.droppableProps}>
                                            
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>   
                                </> 
                            )
                        }
                        })}
                </div>
            </Card.Body>
        </Card>
    )    
}
