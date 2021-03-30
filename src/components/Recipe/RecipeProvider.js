import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const RecipeContext = createContext()

// This component establishes what data can be used.
export const RecipeProvider = (props) => {
    const [recipes, setRecipes] = useState([])
    const [userRecipes, setUserRecipes] = useState([])
    // const [searchTerms, setSearchTerms ] = useState("")
    const currentUser = localStorage.getItem("YouAreWhatYouEat_user")

    const getRecipes = () => {
        return fetch("http://localhost:8088/recipes?_embed=ingredients")
        .then(res => res.json())
        .then(setRecipes)
    }

    const getRecipeById = (id) => {
        return fetch(`http://localhost:8088/recipes/${id}`)
            .then(res => res.json())
    }

    const getUserRecipes = () => {
        return fetch(`http://localhost:8088/userrecipes?_userId=${currentUser}&_expand=recipe`)
        .then(res => res.json())
        .then(setUserRecipes)
    }

    const addRecipe = RecipeObj => {
        return fetch("http://localhost:8088/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(RecipeObj)
        })
        // .then(response => response.json())
    }

    const getRecipeIngredientsByRecipeIds = (recipeIds) => {
        const promiseArray = recipeIds.map(recipeId => {
            fetch(`http://localhost:8088/ingredients?_recipeId=${recipeId}`)
        })
        return fetch(`http://localhost:8088/ingredients?_recipeId=${recipeId}`)
        .then(res => res.json())
    }
    
    // const releaseRecipe = RecipeId => {
    //     return fetch(`http://localhost:8088/Recipes/${RecipeId}`, {
    //         method: "DELETE"
    //     })
    //         .then(getRecipes)
    // }

    // const updateRecipe = Recipe => {
    //     return fetch(`http://localhost:8088/Recipes/${Recipe.id}`, {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify(Recipe)
    //     })
    //       .then(getRecipes)
    //   }

    const addIngredient = (IngArr, recipeId) => {
        const promiseArray = IngArr.map(IngObj => {
            IngObj.recipeId = recipeId
            fetch("http://localhost:8088/ingredients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(IngObj)
            })
        })
        // return Promise.all()
        return Promise.all(promiseArray)
        // .then(response => response.json())
    }

    /*
        You return a context provider which has the
        `Recipes` state, `getRecipes` function,
        and the `addRecipe` function as keys. This
        allows any child elements to access them.
    */
    return (
        <RecipeContext.Provider value={{
            recipes, userRecipes, getRecipes, getUserRecipes, getRecipeById, addRecipe, addIngredient, getRecipeIngredientsByRecipeId
        }}>
            {props.children}
        </RecipeContext.Provider>
    )
}