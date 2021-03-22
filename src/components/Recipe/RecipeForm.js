import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { RecipeContext } from "./RecipeProvider"
import Table from 'react-bootstrap/Table'

import { IngredientTable } from "./IngredientsTable"
import "./Recipe.css"

export const RecipeForm = () => {
    const { addRecipe, addIngredient } = useContext(RecipeContext)
    
    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
    Define the intial state of the form inputs with useState()
    */

    const [recipe, setRecipe] = useState({})
    let [numIngredients, setNumIngredients] = useState(1)
    const [ingredients, setIngredients] = useState([{name: "", amount: "", unit: "", preparation: "", foodType: ""}])
    
    const history = useHistory()

    // when the "+ Row" button is clicked, this function will copy state, add 1 to state, and pass the new number of rows into the IngredientTable component, which will re-render
    const handleAddRow = () => {
      // expand State of ingredients array
      let ingredientList = [ ...ingredients ]
      const newIngredient = {name: "", amount: "", unit: "", preparation: "", foodType: ""}
      ingredientList = ingredientList.push(newIngredient)
      setIngredients(ingredientList)

      // Add 1 to the number of ingredients
      let newNumIngredients = ++numIngredients
      setNumIngredients(newNumIngredients)
    }

    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
      /* When changing a state object or array,
      always create a copy, make changes, and then set state.*/
      const newRecipe = { ...recipe }
      /* Recipe is an object with properties.
      Set the property to the new value
      using object bracket notation. */
      newRecipe[event.target.id] = event.target.value
      // update state
      setRecipe(newRecipe)
    }

    const handleIngredientInputChange = (event) => {
      // determine the row of the ingredient changed and the ingredient element being changed
      let [_ , row, elem] = event.target.id.split("-")
      row = +row -1
      
      /* When changing a state object or array,
      always create a copy, make changes, and then set state.*/
      // console.log(event)
      let ingredientList = [ ...ingredients ]
      // console.log(ingredientList)
      if (elem === "foodType") {
        ingredientList[row][elem]=event.target.value
      } else {
        ingredientList[row][elem]=event.target.innerText
      }
      console.log(ingredientList)
      
      setIngredients(ingredientList)
    }

    const handleClickSaveRecipe = () => {
      // Save the recipe details
      addRecipe({
        name: recipe.name,
        userId: +localStorage.getItem("YouAreWhatYouEat_user"),
        instructions: recipe.instructions
      })
      .then()
      .then(() => history.push("/recipes"))
    }

    /*
    Reach out to the world and get customers state
    and locations state on initialization. 
    If animalId is in the URL, getAnimalById
    */
    // useEffect(() => {
    //   getRecipes()
    // }, [])
    const columns = ["Ingredient", "Amount", "Unit", "Preparation", "Food Type"];
    const dataNames = ["name", "amount", "unit", "preparation", "foodType"]
    let numRowArray = Array.from({length: numIngredients}, (_, index) => index + 1)

    const foodTypes = ["Produce", "Meat", "Eggs and Dairy", "Frozen", "Packaged/Processed", "Deli", "Bakery"]

    return (
      <form className="recipeForm">
          <h2 className="recipeForm__title">New Recipe</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Recipe name:</label>
                  <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Recipe name" value={recipe.name}/>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                <div className="ingredientTable__header">
                  <label htmlFor="ingredients">Ingredients:</label>
                  <div>
                    <button className="btn btn-secondary btn-sm" onClick={handleAddRow}>+ Row</button>
                  </div>
                </div>
                <Table responsive>
                  <thead>
                      <tr>
                      {columns.map((col, index) => (
                          <th key={index}>{col}</th>
                      ))}
                      </tr>
                  </thead>
                  <tbody>
                      {numRowArray.map(num => (
                          <tr key={num}>
                              {Array.from({ length: 4 }).map((_, index) => (
                                  <td key={index} id={`row-${num}-${dataNames[index]}`} contentEditable="true" onInput={handleIngredientInputChange}>{columns[index]} {index+1}</td>
                              ))}
                              <td key={5} name={dataNames[dataNames.length]}>
                                  <select name="foodType" id={`row-${num}-foodType`} className="form-control" onChange={handleIngredientInputChange}>
                                      <option value="0">Select food type</option>
                                      {foodTypes.map((ft, index) => (
                                          <option key={index} value={ft}>
                                              {ft}
                                          </option>
                                      ))}
                                  </select>
                              </td>
                          </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="instructions">Instructions:</label>
                  <input type="text" id="instructions" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Recipe instructions" value={recipe.instructions}/>
              </div>
          </fieldset>
          <button className="btn btn-primary"
            onClick={event => {
              event.preventDefault() 
              handleClickSaveRecipe()
            }}>
              Save Recipe
            {/* {RecipeId ? <>Save Recipe</> : <>Add Recipe</>} */}
          </button>
      </form>
    )
}
