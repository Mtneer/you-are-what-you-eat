import React from "react"
import Table from 'react-bootstrap/Table'

export const IngredientTable = ({numberIngredients, setIngredients}) => {
    const columns = ["Ingredient", "Amount", "Unit", "Preparation", "Food Type"];
    const numRowArray = Array.from({length: numberIngredients}, (_, index) => index + 1)
    console.log(numRowArray)

    const foodTypes = ["Produce", "Meat", "Eggs and Dairy", "Frozen", "Packaged/Processed", "Deli", "Bakery"]

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
                            <td key={index} contentEditable="true">{columns[index]} {index+1}</td>
                        ))}
                        <td key={numberIngredients}>
                            <select name="foodType" id="foodType" className="form-control">
                                <option value="0">Select food type</option>
                                {foodTypes.map((ft, index) => (
                                    <option key={index} value={index}>
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