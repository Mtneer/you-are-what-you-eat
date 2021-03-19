import React from "react"
import "./Recipe.css"
import { Link } from "react-router-dom"

export const RecipeCard = ({ recipe }) => (
    <section className="recipe">
        <h3 className="recipe__name">
            { recipe.name }
        </h3>
        {/* <div className="recipe__ingredients">{ recipe?.ingredient.map(ing => {<p>{ing.ingredient}</p>}) }</div> */}
        <div className="recipe__instructions">{ recipe.instructions }</div>
    </section>
)