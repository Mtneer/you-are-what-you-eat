import React, { useState, useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { RecipeContext } from "../Recipe/RecipeProvider"
import { MenuContext } from "../Menu/MenuProvider"
import Button from "react-bootstrap/Button"
// import "./Recipe.css"

export const ShoppingList = () => {
    const { getRecipes, recipes, getRecipeIngredientsByRecipeIds } = useContext(RecipeContext)
    const { menuRecipes, getMenuRecipes } = useContext(MenuContext)

    const [menuIngredients, setMenuIngredients] = useState([])
    // Since you are no longer ALWAYS displaying all of the Recipes
    // const [ filteredRecipes, setFiltered ] = useState([])
    const history = useHistory()
    const menuID = 2
    // Initialization effect hook -> Go get Recipe data
    let newMenuRecipeIds = []
    useEffect(()=>{
        getMenuRecipes(menuID)
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes)
            newMenuRecipeIds = parsedRes.map(menuRecipe => menuRecipe.recipeId)
            console.log(newMenuRecipeIds)
        })
        .then(() => {
            getRecipeIngredientsByRecipeIds(newMenuRecipeIds)
            .then(ingObjArr => {
                
            })
        })
    }, [])

    // Need to import ingredients based on a menuId

    return (
        <>
            <h1>Shopping List</h1>
            <div className="shopping-list">
                {/* {
                    recipes.map((recipe) => {
                        return <RecipeCard key={recipe.id} recipe={recipe} />
                    })
                } */}
            </div>
        </>
    )
}