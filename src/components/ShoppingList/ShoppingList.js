import React, { useState, useContext, useEffect } from "react"
import { RecipeContext } from "../Recipe/RecipeProvider"
import { MenuContext } from "../Menu/MenuProvider"
import { ShoppingSection } from "./ShoppingSection"
import { MenuLibrary } from "../Menu/MenuLibrary"
import "./ShoppingList.css"

export const ShoppingList = () => {
    const { getRecipeIngredientsByRecipeIds } = useContext(RecipeContext)
    const { menuRecipes, getMenuRecipes } = useContext(MenuContext)

    const [menuIngredients, setMenuIngredients] = useState([])

    const [menuId, setMenuId] = useState([])
    // Since you are no longer ALWAYS displaying all of the Recipes
    // const [ filteredRecipes, setFiltered ] = useState([])
    // const history = useHistory()

    // Initialization effect hook -> Go get Recipe data
    let newMenuRecipeIds = []
    useEffect(()=>{
        
        getMenuRecipes(menuId)
        .then(res => res.json())
        .then(parsedRes => {
            newMenuRecipeIds = parsedRes.map(menuRecipe => menuRecipe.recipeId)
        })
        .then(() => {
            getRecipeIngredientsByRecipeIds(newMenuRecipeIds)
            .then(ingObjArr => {
                let newMenuIngredientsArray = ingObjArr.flat()
                newMenuIngredientsArray.sort((r1, r2) => {
                    if (r1.foodType.toLowerCase() < r2.foodType.toLowerCase()) {
                        return -1
                    } else if (r1.foodType.toLowerCase() > r2.foodType.toLowerCase()) {
                        return 1
                    } else {return 0}
                })
                setMenuIngredients(newMenuIngredientsArray)
            })
        })
    }, [menuId])

    const handleClickMenu = (event) => {
        setMenuId(event.target.id)
    }

    // Need to import ingredients based on a menuId
    const foodTypes = ["Produce", "Meat", "Eggs and Dairy", "Frozen", "Packaged/Processed", "Deli", "Bakery"]

    return (
        <>
            <section className="row">
                <div className="col-lg-1 col-sm-1"></div>
                <article className="col-lg-8 col-sm-8">
                    <h1>Shopping List</h1>
                    <div className="shopping-list row">
                        {
                            foodTypes.map((foodTypeName, index) => {
                                
                                const ingredients = menuIngredients.filter(ing => 
                                    ing.foodType === foodTypeName)
                                if (ingredients.length === 0) {return}
                                return <ShoppingSection key={foodTypeName} foodType={foodTypeName} ingredients={ingredients} />
                                
                            })
                        }
                    </div>
                </article>
                <aside className="menu-library col-lg-2 col-sm-2">
                    <MenuLibrary handleClickMenu={handleClickMenu}/>
                </aside>
                <div className="col-lg-1 col-sm-1"></div>
            </section>
        </>
    )
}