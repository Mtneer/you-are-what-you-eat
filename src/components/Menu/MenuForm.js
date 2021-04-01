import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import { MenuContext } from "./MenuProvider"
import { RecipeContext } from "../Recipe/RecipeProvider"
import { Menu } from "./Menu"
import { DragDropContext } from 'react-beautiful-dnd';
// import { MenuFormContext } from './DragDropProvider'
import { DragDropRecipeLibrary } from "./DragDropRecipeLibrary"
import "./Menu.css"

export const MenuForm = () => {
    // pull functions and define State to save new menu
    const { addMenu, addMenuRecipes, getMenuRecipes } = useContext(MenuContext)
    const [menu, setMenu] = useState({})

    const menuID = 2
    const { menuRecipes, setMenuRecipes } = useContext(MenuContext)
    const [menuFormData, setMenuFormData] = useState([])
    console.log(menuFormData)
    // Define State to manage number of days in the menu
    let [numDays, setNumDays] = useState(1)

    // pull functions and data to manage the drag and drop feature
    // const { menuFormData, setMenuFormData } = useContext(MenuFormContext)
    // console.log(menuFormData)
    
    // const [menuRecipes, setMenuRecipes] = useState([])

    // Set state to keep track of which recipes are in each MenuDay for the drag and drop feature. This will be an array of recipeIds
    // const [menuDay, setMenuDay] = useState([])

    // Set state to keep track of 
    let numDaysArray = Array.from({length: numDays}, (_, index) => index + 1)
    
    const history = useHistory()

    const { userRecipes, getUserRecipes  } = useContext(RecipeContext)

    // Initialization effect hook -> Go get Recipe data
    useEffect(()=>{
        getUserRecipes()
        .then(getMenuRecipes(menuID))
    }, [])

    // when the "+ Row" button is clicked, this function will copy state, add 1 to state, and pass the new number of rows into the IngredientTable component, which will re-render
    const handleAddDay = () => {
        // Add 1 to the number of ingredients
        let newNumDays = ++numDays
        setNumDays(newNumDays)

        // let formData = {...menuFormData}

    }

    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
        console.log(event.target.value)
      /* When changing a state object or array,
      always create a copy, make changes, and then set state.*/
      const newMenu = { ...menu }
      /* Recipe is an object with properties.
      Set the property to the new value
      using object bracket notation. */
      newMenu[event.target.id] = event.target.value
      // update state
      setMenu(newMenu)
      console.log(newMenu)
    }

    const handleClickSaveMenu = () => {
      // Save the menu details
      addMenu({
        name: menu.name,
        userId: +localStorage.getItem("YouAreWhatYouEat_user"),
      })
      .then(response => response.json())
      .then(parsedRes => {
        // pull out RecipeId
        const menuId = parsedRes.id
        // pass in array of ingredients and recipeId to addIngredientFunction
        addMenuRecipes(menuFormData, menuId)
      })
      .then(() => history.push("/shopping-list"))
    }

    const handleDragChange = (result) => {
        console.log(result)
        const { destination, source, draggableId } = result;

        // If the destination is empty, no change needs to be processed
        if (!destination) {
            return;
        }
        // if the draggable component has been dropped in the same parent in the same order, no change needs to be processed.
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        // Start and Finish Droppable Containers
        const startPosition = source.droppableId
        const [ , finishDay, , finishPosition] = destination.droppableId.split("-")
        console.log(startPosition)
        console.log(finishPosition)
        console.log(finishDay)

        const newMenuFormData = [...menuFormData]
        console.log(newMenuFormData)
        const indexToRemove = undefined
        // if (newMenuFormData.length === 0) {

        // } else if (newMenuFormData.menuRecipes.length > 0) {
        //     indexToRemove = newMenuFormData.menuRecipes.find((menuRecipe, index) => {
        //         if (menuRecipe.menuId === menuID && menuRecipe.position === finishPosition) {
        //             return index
        //         }
        //     })
        // }

        const newMenuRecipe = {
            menuId: 1,
            recipeId: +draggableId.split("-")[1],
            position: (parseInt(finishDay)-1)*4+parseInt(finishPosition)
        }
        console.log(newMenuRecipe)
        
        if (indexToRemove !== undefined) {
            console.log(indexToRemove)
            // newMenuFormData.menuRecipes.splice(indexToRemove, 1)
        }
        newMenuFormData.push(newMenuRecipe)
        setMenuFormData(newMenuFormData)
        console.log(newMenuFormData)
    }

    return (
        <>
        <section className="main-container row gx-6">
        <DragDropContext onDragEnd={handleDragChange}>
            <article className="form-container col-lg-9 col-sm-9">
                <form className="menuForm">
                    <div className="menuForm__header">
                        <h2 className="menuForm__title">New Menu</h2>
                        <fieldset className="flex-container">
                            <label className="menu-name-field-label" htmlFor="name">Menu name:</label>
                            <input type="text" id="name" required autoFocus className="form-control" placeholder="Menu name" onInput={handleControlledInputChange} />
                        </fieldset>
                        <div>
                            <button className="btn btn-secondary btn-sm" onClick={handleAddDay}>+ Day</button>
                        </div>
                    </div>
                    <div className="menuDay-container">
                        {Array.from({length: numDays}, (_, index) => index + 1).map(numDay => {
                            let dayRecipes = []

                            if (menuFormData.length !== 0) {
                                // if the position number of the menuRecipe is between (numDays-1)*4 and numDays*4, then pass it into dayRecipes
                                dayRecipes = menuFormData.filter(menuRecipe => {
                                    if (Math.floor((menuRecipe.position-1)/4+1) === (numDay)) {
                                        return menuRecipe
                                    }
                                })
                            }
                            
                            return (
                                <Menu key={`Day-${numDay}`} numDay={numDay} dayRecipes={dayRecipes}></Menu>
                            )
                        })}
                    </div>
                    <button className="btn btn-primary"
                        onClick={event => {
                        event.preventDefault() 
                        handleClickSaveMenu()
                        }}>
                        Save Menu
                    </button>
                </form>
            </article>
            <aside className="recipe-library col-lg-3 col-sm-3">
                <DragDropRecipeLibrary recipes={userRecipes} />        
            </aside>
        </DragDropContext>
        </section>
        </>
    )
}
