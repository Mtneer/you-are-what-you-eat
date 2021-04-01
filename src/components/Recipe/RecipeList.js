import React, { useState, useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { RecipeContext } from "./RecipeProvider"
import { RecipeCard } from "./Recipe"
import { RecipeLibrary } from "./RecipeLibrary"
import Button from "react-bootstrap/Button"
import "./Recipe.css"

export const RecipeList = () => {
    const { recipes, getRecipes, addUserRecipe } = useContext(RecipeContext)

    // const { userRecipes, getUserRecipes } = useContext(RecipeContext)
    
    // Since you are no longer ALWAYS displaying all of the Recipes
    // const [ filteredRecipes, setFiltered ] = useState([])
    const history = useHistory()

    // Initialization effect hook -> Go get Recipe data
    useEffect(()=>{
        getRecipes()
        // .then(getUserRecipes())
    }, [])

    const handleClickAddToLibrary = (event) => {
        
        const recipeToAdd = {
            recipeId: +event.target.id,
            userId: +localStorage.getItem("YouAreWhatYouEat_user") 
        }
        console.log(recipeToAdd)
        addUserRecipe(recipeToAdd)
    }

    return (
        <>
        <section className="row">
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
                            return <RecipeCard key={recipe.id} recipe={recipe} handleClickAddToLibrary={handleClickAddToLibrary}/>
                        })
                    }
                </div>
            </article>
            <aside className="col-lg-4 col-sm-4">
                <RecipeLibrary />
            </aside>
        </section>
        </>
    )
}