import React, { useState, useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { RecipeContext } from "../Recipe/RecipeProvider"
import { MenuContext } from "../Menu/MenuProvider"
import Button from "react-bootstrap/Button"
import "./Recipe.css"

export const ShoppingList = () => {
    const { getRecipes, recipes, getRecipeIngredientsByRecipeId } = useContext(RecipeContext)
    const { menuRecipes, getMenuRecipes } = useContext(MenuContext)

    const [menuRecipeIds, setMenuRecipeIds] = useState([])
    // Since you are no longer ALWAYS displaying all of the Recipes
    // const [ filteredRecipes, setFiltered ] = useState([])
    const history = useHistory()

    // Initialization effect hook -> Go get Recipe data
    useEffect(()=>{
        getMenuRecipes(menuID)
        .then(res => {
            const newMenuRecipeIds = res.map(menuRecipe => menuRecipe.recipeId)            
        })
        .then(() => {
            promiseArray = 
            getRecipeIngredientsByRecipeId()
            
        })
    }, [])

    // Need to import ingredients based on a menuId

    return (
        <>
            <h1>Shopping List</h1>
            <div className="shopping-list">
                {
                    recipes.map((recipe) => {
                        return <RecipeCard key={recipe.id} recipe={recipe} />
                    })
                }
            </div>
        </>
    )
}