import React from "react"
import { Route } from "react-router-dom"
import "./YouAreWhatYouEat.css"
// import { Home } from "./Home"

// import { RecipeSearch } from "./Recipe/RecipeSearch"
import { RecipeForm } from "./Recipe/RecipeForm"
import { RecipeList } from "./Recipe/RecipeList"
import { RecipeProvider } from "./Recipe/RecipeProvider"

import { MenuProvider } from "./Menu/MenuProvider"
import { MenuFormProvider } from "./Menu/DragDropProvider"
import { MenuForm } from "./Menu/MenuForm"

import { ShoppingList } from "./ShoppingList/ShoppingList"

export const ApplicationViews = () => {

    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            
            {/* <Route exact path="/">
                <Home />
            </Route> */}

            {/* Render the Recipe list when http://localhost:3000/recipes */}
            <RecipeProvider>
                <Route exact path="/recipes">
                    <RecipeList />
                </Route>
                <Route exact path="/recipes/create">
                    <RecipeForm />
                </Route>
                <MenuProvider>
                    <MenuFormProvider>
                        <Route exact path="/menus">
                            <MenuForm />
                        </Route>
                        <Route exact path="/shopping-list">
                            <ShoppingList />
                        </Route>
                        {/* <Route exact path="/shopping-list/:menuIDfromSL(\d+)">
                            <ShoppingList />
                        </Route> */}
                    </MenuFormProvider>
                </MenuProvider>
            </RecipeProvider>
        </>
    )
}