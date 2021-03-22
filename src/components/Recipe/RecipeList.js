import React, { useState, useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { RecipeContext } from "./RecipeProvider"
import { RecipeCard } from "./Recipe"
import Button from "react-bootstrap/Button"
import "./Recipe.css"

export const RecipeList = () => {
    const { getRecipes, recipes } = useContext(RecipeContext)
    
    // Since you are no longer ALWAYS displaying all of the Recipes
    // const [ filteredRecipes, setFiltered ] = useState([])
    const history = useHistory()

    // Initialization effect hook -> Go get Recipe data
    useEffect(()=>{
        getRecipes()
    }, [])

    // useEffect dependency array with dependencies - will run if dependency changes (state)
    // searchTerms will cause a change
    // useEffect(() => {
    //     if (searchTerms !== "") {
    //         // If the search field is not blank, display matching Recipes
    //         const subset = recipes.filter(Recipe => Recipe.name.toLowerCase().includes(searchTerms))
    //         setFiltered(subset)
    //     } else {
    //         // If the search field is blank, display all Recipes
    //         setFiltered(recipes)
    //     }
    // }, [searchTerms, Recipes])

    return (
        <>
            <h1>Recipes</h1>

            <Button onClick={() => history.push("/recipes/create")}>
                Create New Recipe
            </Button>

            <div className="recipes">
                {
                    recipes.map(recipe => {
                        return <RecipeCard key={recipe.id} recipe={recipe} />
                    })
                }
            </div>
        </>
    )
}