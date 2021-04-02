import React from "react"
import Card from 'react-bootstrap/Card'
import "./ShoppingList.css"

export const ShoppingSection = ({ foodType, ingredients }) => {
    
    ingredients.sort((ing1, ing2) => {
        if (ing1.name.toLowerCase() < ing2.name.toLowerCase()) {
            return -1
        } else if (ing1.name.toLowerCase() > ing2.name.toLowerCase()) {
            return 1
        } else {return 0}
    })
    return (
        <>
            <Card className="food-type">
                <Card.Body>
                    <Card.Title>{ foodType }</Card.Title>

                    <div className="food-type__ingredients">{ ingredients.map((ing, index) => {
                        return ( 
                        <div className="ingredient_row">
                            <p className="ingredient_name" key={index}>{ing.name}</p>
                            <p className="ingredient_amount" key={index}>{ing.amount}</p>
                            <p className="ingredient_unit" key={index}>{ing.unit}</p>
                        </div>)})}
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}