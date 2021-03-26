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

    const menuID = 1
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
        .then(console.log(userRecipes))
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
    //   /* When changing a state object or array,
    //   always create a copy, make changes, and then set state.*/
    //   const newMenu = { ...menu }
    //   /* Recipe is an object with properties.
    //   Set the property to the new value
    //   using object bracket notation. */
    //   newMenu[event.target.id] = event.target.value
    //   // update state
    //   setMenu(newMenu)
    }

    const handleClickSaveMenu = () => {
      // Save the menu details
    //   addMenu({
    //     name: menu.name,
    //     userId: +localStorage.getItem("YouAreWhatYouEat_user"),
    //   })
    //   .then(response => response.json())
    //   .then(parsedRes => {
    //     // pull out RecipeId
    //     const menuId = parsedRes.id
    //     // pass in array of ingredients and recipeId to addIngredientFunction
    //     addMenuRecipes(menuRecipes, menuId)
    //   })
    //   .then(() => history.push("/shopping-list"))
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
            position: finishDay*finishPosition
        }
        console.log(newMenuRecipe)
        
        if (indexToRemove !== undefined) {
            console.log(indexToRemove)
            // newMenuFormData.menuRecipes.splice(indexToRemove, 1)
        }
        newMenuFormData.push(newMenuRecipe)
        setMenuFormData(newMenuFormData)
        console.log(newMenuFormData)
        console.log(menuFormData)
        // const start = []
        // const finish = []

        // if (start === finish) {
        //     const newTaskIds = Array.from(start.taskIds);
        //     // remove the old index of recipeId from the array
        //     newTaskIds.splice(source.index, 1);
        //     // insert the recipeId into the new index
        //     newTaskIds.splice(destination.index, 0, draggableId);
      
        //     const newColumn = {
        //       ...start,
        //       taskIds: newTaskIds,
        //     };
      
        //     const newState = {
        //       ...this.state,
        //       columns: {
        //         ...this.state.columns,
        //         [newColumn.id]: newColumn,
        //       },
        //     };
      
        //     this.setState(newState);
        //     return;
        // }

        // // Moving from one list to another
        // const startTaskIds = Array.from(start.taskIds);
        // startTaskIds.splice(source.index, 1);
        // const newStart = {
        // ...start,
        // taskIds: startTaskIds,
        // };

        // const finishTaskIds = Array.from(finish.taskIds);
        // finishTaskIds.splice(destination.index, 0, draggableId);
        // const newFinish = {
        // ...finish,
        // taskIds: finishTaskIds,
        // };

        // const newState = {
        // ...this.state,
        // columns: {
        //     ...this.state.columns,
        //     [newStart.id]: newStart,
        //     [newFinish.id]: newFinish,
        // },
        // };
        // this.setState(newState);

    }

    return (
        <>
        <DragDropContext onDragEnd={handleDragChange}>
            <main className="mainContainer">
                <form className="menuForm">
                    <div className="menuForm__header">
                        <h2 className="menuForm__title">New Menu</h2>
                        <fieldset className="flex-container">
                            <label htmlFor="name">Menu name:</label>
                            <input type="text" id="name" required autoFocus className="form-control" placeholder="Menu name" />
                        </fieldset>
                        <div>
                            <button className="btn btn-secondary btn-sm" onClick={handleAddDay}>+ Day</button>
                        </div>
                    </div>
                    <div className="menuDay__container">
                        {Array.from({length: numDays}, (_, index) => index + 1).map(numDay => {
                            let dayRecipes = []
                            console.log(menuFormData)
                            if (menuFormData.length !== 0) {
                                // if the position number of the menuRecipe is between (numDays-1)*4 and numDays*4, then pass it into dayRecipes
                                dayRecipes = menuFormData.filter(menuRecipe => {
                                    if (menuRecipe.position > (numDay-1)*4 && menuRecipe.position <= numDay*4) {
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
            </main>

            <DragDropRecipeLibrary recipes={userRecipes} />        
        </DragDropContext>
        </>
    )
}
