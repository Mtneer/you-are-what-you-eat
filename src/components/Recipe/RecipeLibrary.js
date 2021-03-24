import React, { useState, useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { RecipeContext } from "./RecipeProvider"
import "./Recipe.css"

export const RecipeLibrary = () => {
    const { recipes, getRecipes } = useContext(RecipeContext)

    // Initialization effect hook -> Go get Recipe data
    useEffect(()=>{
        getRecipes()
    }, [])

    return (
        <aside>
            <h3>Recipes</h3>
            <div className="recipes">
                {
                    recipes.map(recipe => {
                        return (
                            <div className="recipeTile" key={recipe.id}>
                                <p className="recipe__name">
                                    { recipe.name }
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </aside>
    )
}