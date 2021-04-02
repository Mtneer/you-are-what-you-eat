import React, { useState, useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { RecipeContext } from "./RecipeProvider"
import { RecipeCard } from "./Recipe"
import { RecipeLibrary } from "./RecipeLibrary"
import Button from "react-bootstrap/Button"
import "./Recipe.css"

export const RecipeList = () => {
    const { recipes, getRecipes, userRecipes, getUserRecipes, addUserRecipe } = useContext(RecipeContext)
    
    // Since you are no longer ALWAYS displaying all of the Recipes
    // const [ filteredRecipes, setFiltered ] = useState([])
    const history = useHistory()

    // Initialization effect hook -> Go get Recipe data
    useEffect(()=>{
        getUserRecipes()
        .then(getRecipes())
    }, [])

    const handleClickAddToLibrary = (event) => {
        
        const recipeToAdd = {
            recipeId: +event.target.id,
            userId: +localStorage.getItem("YouAreWhatYouEat_user") 
        }
        addUserRecipe(recipeToAdd)
        .then(getUserRecipes)
    }

    return (
        <>
        <section className="row">
            <div className="col-lg-1 col-sm-1"></div>
            <article className="col-lg-8 col-sm-8">
                <div className="recipe-header">
                    <h1>Recipes</h1>
                    <div className="button-container">
                        <Button className="btn-sm" onClick={() => history.push("/recipes/create")}>
                            Create New Recipe
                        </Button>
                    </div>
                </div>
                <div className="recipes">
                    {
                        recipes.map((recipe) => {
                            console.log(recipes)
                            const print = userRecipes.map(uR => uR.recipeId).includes(recipe.id)
                            return <RecipeCard key={recipe.id} recipe={recipe} print={print} handleClickAddToLibrary={handleClickAddToLibrary}/>
                        })
                    }
                </div>
            </article>
            <aside className="recipe-library col-lg-2 col-sm-2">
                <RecipeLibrary userRecipes={userRecipes}/>
            </aside>
            <div className="col-lg-1 col-sm-1"></div>
        </section>
        </>
    )
}