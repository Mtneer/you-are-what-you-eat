import React from "react"
import Card from 'react-bootstrap/Card'
import { Droppable } from "react-beautiful-dnd"
import { DraggableRecipeItem } from "./DraggableRecipeItem"

export const Menu = ({key, menuDay, dayRecipes}) => {
    const labels = ["Breakfast", "Lunch", "Dinner", "Snack"]
            
    return (
        <Card className="menu-card" key={key}>
            <Card.Body>
                <Card.Title>{menuDay.title}</Card.Title>
                <div className="dayForm-container">
                    {dayRecipes.map((recipe,index) => (
                        <>
                            <h5 className="meal">Breakfast:</h5>
                            <Droppable droppableId={menuDay.id}>
                                {(provided) => (
                                    <div className="mealDayForm-container" innerRef={provided.innerRef} {...provided.droppableProps}>
                                        
                                        <DraggableRecipeItem key={recipe.id} recipe={recipe} index={index} />
                                        
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </>
                    ))}
                </div>
            </Card.Body>
        </Card>
    )    
}
