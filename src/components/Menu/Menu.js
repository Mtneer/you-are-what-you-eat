import React from "react"
import Card from 'react-bootstrap/Card'
import { Meal } from "./Meal"

export const Menu = ({ menuDay, dayRecipes}) => {
    
    return (
        <Card className="menu-card">
            <Card.Body>
                <Card.Title>{menuDay.title}</Card.Title>
                <div className="dayForm-container">
                    {dayRecipes.map((recipeId,index) => {
                        <Meal key={recipeId} day={menuDay.title} recipeId={recipeId} index={index} />        
                    })}
                </div>
            </Card.Body>
        </Card>
    )    
}
