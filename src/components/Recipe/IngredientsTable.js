import React from "react"
import Table from 'react-bootstrap/Table'

export const IngredientTable = ({numberIngredients, setIngredients, ingredients}) => {
    const columns = ["Ingredient", "Amount", "Unit", "Preparation", "Food Type"];
    const dataNames = ["name", "amount", "unit", "preparation", "foodType"]
    let numRowArray = Array.from({length: numberIngredients}, (_, index) => index + 1)

    const foodTypes = ["Produce", "Meat", "Eggs and Dairy", "Frozen", "Packaged/Processed", "Deli", "Bakery"]

    const handleIngredientInputChange = (event) => {
        // determine the row of the ingredient changed and the ingredient element being changed
        const [_ , row, elem] = event.target.id.split("-")
        const rowIndex = +row -1
        console.log(rowIndex)
        console.log(elem)
        
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const ingredientList = [ ...ingredients ]
        console.log(ingredientList)
        console.log(ingredientList.length)
        console.log(ingredientList.length < rowIndex + 1)
        if (ingredientList.length < +row) {
          let newIngredient = {
            name: "", 
            amount: "", 
            unit: "", 
            preparation: "", 
            foodType: ""
          }
          if (elem === "foodType") {
            newIngredient[elem]=event.target.value
          } else {
            newIngredient[elem]=event.target.innerText
          }
          
          const newIngredientList = ingredientList.push(newIngredient)
          setIngredients(newIngredientList)
        } else {
          if (elem === "foodType") {
            ingredientList[rowIndex][elem]=event.target.value
          } else {
            ingredientList[rowIndex][elem]=event.target.innerText
          }
          setIngredients(ingredientList)
        }
        console.log(ingredientList)
    }

    return (
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
    )
}