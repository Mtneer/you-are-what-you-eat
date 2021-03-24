import React, { useState, useContext, useEffect, createContext } from "react"
import { RecipeContext } from "../Recipe/RecipeProvider"

// The context is imported and used by individual components that need data
export const MenuFormContext = createContext()

// This component establishes what data can be used.
export const MenuFormProvider = (props) => {
    const {userRecipes, getUserRecipes} = useContext(RecipeContext)

    // Initialization effect hook -> Go get Recipe data
    useEffect(()=>{
        getUserRecipes()
    }, [])

    const [menuFormData, setMenuFormData] = useState({
        menuDays: [{
            id: 'day-1',
            title: 'Day 1',
            recipeIds: []
        }],
        recipes: [userRecipes]
    })

    
    return (
        <MenuFormContext.Provider value={{
            menuFormData, setMenuFormData
        }}>
            {props.children}
        </MenuFormContext.Provider>
    )
}