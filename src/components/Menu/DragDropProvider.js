import React, { useState, useContext, useEffect, createContext } from "react"
import { RecipeContext } from "../Recipe/RecipeProvider"
import { MenuContext } from "./MenuProvider"

// The context is imported and used by individual components that need data
export const MenuFormContext = createContext()

// This component establishes what data can be used.
export const MenuFormProvider = (props) => {
    const {userRecipes, getUserRecipes} = useContext(RecipeContext)
    const { menuRecipes, setMenuRecipes } = useContext(MenuContext)


    // Initialization effect hook -> Go get Recipe data
    useEffect(()=>{
        getUserRecipes()
    }, [])

    const [menuFormData, setMenuFormData] = useState({
        menuId: 1,
        menuContainers: [
            {
                id: `day-1-P-1`,
                dayNum: 1,
                posNum: 1,
                title: "Breakfast",
                recipeIds: []
            },
            {
                id: `day-1-P-2`,
                dayNum: 1,
                posNum: 2,
                title: "Lunch",
                recipeIds: []
            },
            {
                id: `day-1-P-3`,
                dayNum: 1,
                posNum: 3,
                title: "Dinner",
                recipeIds: []
            },
            {
                id: `day-1-P-4`,
                dayNum: 1,
                posNum: 4,
                title: "Snacks",
                recipeIds: []
            }
        ],
        recipeListContainer: {
            id: 'recipe-library',
            title: 'Recipe-Library',
            recipeIds: [userRecipes]
        },
        recipes: [userRecipes]
    })


    // This won't be needed because once I finish the helper function and the save function, everything will be managed through the API and state.
    // menuRecipes.forEach(menuRecipe => {
    //     const labels = ["Breakfast", "Lunch", "Dinner", "Snack"]

    //     const newMenuFormData = {...menuFormData}
    //     const posNum = menuRecipe.position
    //     const dayNum = Math.floor(menuRecipe.position)+1
    //     const checkIfFieldExists = newMenuFormData.menuContainers.find((obj, index) => obj.id === `day-${dayNum}-P-${posNum}` ? index : -1)
    //     // if the menuRecipe is not already in the menuFormData
    //     if (checkIfFieldExists >= 0) {
    //         newMenuFormData.menuContainers[checkIfFieldExists].recipeIds.push(menuRecipe.recipeId) 
    //     }
    //     else if (checkIfFieldExists === -1) {
    //         const newMenuContainer = {
    //             id: `day-${dayNum}-P-${posNum}`,
    //             posNum: posNum,
    //             title: labels[posNum-1],
    //             recipeIds: [menuRecipe.recipeId]
    //         }
    //         newMenuFormData.menuContainers.push(newMenuContainer)
    //     }
    //     setMenuFormData(newMenuFormData)
    // })

    
    return (
        <MenuFormContext.Provider value={{
            menuFormData, setMenuFormData
        }}>
            {props.children}
        </MenuFormContext.Provider>
    )
}