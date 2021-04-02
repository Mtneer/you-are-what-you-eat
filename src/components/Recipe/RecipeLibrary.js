import React, { useState, useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { RecipeContext } from "./RecipeProvider"
import "./Recipe.css"

export const RecipeLibrary = ({userRecipes}) => {
    // const { userRecipes, getUserRecipes } = useContext(RecipeContext)
    console.log(userRecipes)
    // // Initialization effect hook -> Go get Recipe data
    // useEffect(()=>{
    //     getUserRecipes()
    // }, [])
    
    return (
        <>
            <h5 className="aside-title">Recipe Library</h5>
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