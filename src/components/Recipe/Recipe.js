import React from "react"
import "./Recipe.css"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export const RecipeCard = ({ recipe, handleClickAddToLibrary }) => {
    return (
        <>
            <Card className="recipe">
            <div className="card-header">

                <Card.Title>{ recipe.name }</Card.Title>
                <div className="button-container">
                    <Button className="btn-sm btn-secondary" id={recipe.id} onClick={handleClickAddToLibrary}>
                        Add to Library
                    </Button>
                </div>
            </div>
            <Card.Body>
                <div className="recipe__ingredients">
                    <p><strong>Ingredients:</strong></p>
                    <ul>
                        { recipe?.ingredients.map(ing => {return <li className="ingredient" key={ing.id}>{ing.name}</li>})}
                    </ul>
                </div>
                <div className="recipe__instructions">
                    <p><strong>Instructions:</strong></p>
                    <p>{ recipe.instructions }</p>
                </div>
            </Card.Body>
            </Card>
        </>
    )
}