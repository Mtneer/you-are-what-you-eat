import React from "react"
import "./Recipe.css"

export const ShoppingSection = ({ foodType }) => {
    return (
        <>
            <section className="food-type">
                <h3 className="food-type-label">
                    { foodType.name }
                </h3>
                <div className="food-type__ingredients">{ recipe?.ingredients.map(ing => {return <p className="ingredient" key={ing.id}>{ing.name}</p>}) }</div>
                <div className="recipe__instructions">{ recipe.instructions }</div>
            </section>
        </>
    )
}