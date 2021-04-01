import React from "react"
import Card from 'react-bootstrap/Card'


export const ShoppingSection = ({ foodType, ingredients }) => {
    return (
        <>
        <Card className="food-type col-lg-3 col-sm-3">
            <Card.Body>
                <Card.Title>{foodType}</Card.Title>

                <div className="food-type__ingredients">{ ingredients.map((ing, index) => {return <p className="ingredient" key={index}>{ing.name}</p>}) }
                </div>
            </Card.Body>
        </Card>
        </>
    )
}