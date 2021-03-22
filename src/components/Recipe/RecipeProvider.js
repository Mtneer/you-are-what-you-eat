import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const RecipeContext = createContext()

// This component establishes what data can be used.
export const RecipeProvider = (props) => {
    const [recipes, setRecipes] = useState([])
    // const [searchTerms, setSearchTerms ] = useState("")
    const currentUser = localStorage.getItem("YouAreWhatYouEat_user")

    const getRecipes = () => {
        return fetch("http://localhost:8088/recipes?_embed=ingredients")
        .then(res => res.json())
        .then(setRecipes)
        .then(console.log(recipes))
    }

    // const getRecipeById = (id) => {
    //     return fetch(`http://localhost:8088/Recipes/${id}?_expand=location&_expand=customer`)
    //         .then(res => res.json())
    // }

    const addRecipe = RecipeObj => {
        return fetch("http://localhost:8088/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(RecipeObj)
        })
        .then(response => response.json())
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

    const addIngredient = IngObj => {
        return fetch("http://localhost:8088/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(IngObj)
        })
        .then(response => response.json())
    }

    /*
        You return a context provider which has the
        `Recipes` state, `getRecipes` function,
        and the `addRecipe` function as keys. This
        allows any child elements to access them.
    */
    return (
        <RecipeContext.Provider value={{
            recipes, getRecipes, addRecipe, addIngredient
        }}>
            {props.children}
        </RecipeContext.Provider>
    )
}