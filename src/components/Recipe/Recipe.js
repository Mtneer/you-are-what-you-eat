import React from "react"
import "./Recipe.css"
import { Link } from "react-router-dom"

export const RecipeCard = ({ recipe }) => {
    console.log(recipe)
    return (
        <>
            <section className="recipe">
                <h3 className="recipe__name">
                    { recipe.name }
                </h3>
                <div className="recipe__ingredients">{ recipe?.ingredients.map(ing => {return <p className="ingredient" key={ing.id}>{ing.name}</p>}) }</div>
                <div className="recipe__instructions">{ recipe.instructions }</div>
            </section>
        </>
    )
}