import React, { useState, useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { RecipeContext } from "./RecipeProvider"
import "./Recipe.css"

export const RecipeLibrary = () => {
    const { userRecipes, getUserRecipes } = useContext(RecipeContext)

    // Initialization effect hook -> Go get Recipe data
    useEffect(()=>{
        getUserRecipes()
    }, [])
    
    return (
        <>
            <h3>Recipes</h3>
            <div className="recipes">
                {
                    userRecipes.map(userRecipe => {
                        return (
                            <div className="recipeTile" key={userRecipe.recipeId}>
                                <p className="recipe__name">
                                    { userRecipe.recipe.name }
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}