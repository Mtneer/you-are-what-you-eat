import React, { useState, useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { RecipeContext } from "../Recipe/RecipeProvider"
import { MenuContext } from "../Menu/MenuProvider"
import { ShoppingSection } from "./ShoppingSection"
import Button from "react-bootstrap/Button"
// import "./Recipe.css"

export const ShoppingList = () => {
    const { getRecipeIngredientsByRecipeIds } = useContext(RecipeContext)
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
                console.log(ingObjArr)
                let newMenuIngredientsArray = ingObjArr.flat()
                console.log(newMenuIngredientsArray)
                newMenuIngredientsArray.sort((r1, r2) => {
                    console.log(r1)
                    if (r1.foodType.toLowerCase() < r2.foodType.toLowerCase()) {
                        return -1
                    } else if (r1.foodType.toLowerCase() > r2.foodType.toLowerCase()) {
                        return 1
                    } else {return 0}
                })
                setMenuIngredients(newMenuIngredientsArray)
            })
        })
    }, [])

    // Need to import ingredients based on a menuId
    const foodTypes = ["Produce", "Meat", "Eggs and Dairy", "Frozen", "Packaged/Processed", "Deli", "Bakery"]

    return (
        <>
            <h1>Shopping List</h1>
            <div className="shopping-list row">
                {
                    foodTypes.map((foodTypeName, index) => {
                        console.log(menuIngredients)
                        if (menuIngredients.length === 0) {return}
                        const ingredients = menuIngredients.filter(ing => 
                            ing.foodType === foodTypeName)
                        return <ShoppingSection key={foodTypeName} foodType={foodTypeName} ingredients={ingredients} />
                        
                    })
                }
            </div>
        </>
    )
}