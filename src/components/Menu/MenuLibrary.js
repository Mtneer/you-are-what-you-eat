import React, { useState, useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { MenuContext } from "./MenuProvider"
import Button from "react-bootstrap/Button"
import "./Menu.css"

export const MenuLibrary = ({handleClickMenu}) => {
    const { menus, getMenus } = useContext(MenuContext)
    
    // Since you are no longer ALWAYS displaying all of the Recipes
    // const [ filteredRecipes, setFiltered ] = useState([])
    const history = useHistory()

    // Initialization effect hook -> Go get Recipe data
    useEffect(()=>{
        getMenus()
    }, [])

    return (
        <>
            <h5 className="aside-title">Menu Library</h5>
            <div className="menus">
                {
                    menus.map(menu => {
                        return (
                            <div className="menuTile" key={menu.id} >
                                <a className="menu__name" id={menu.id} onClick={handleClickMenu}>
                                    { menu.name }
                                </a>
                            </div>
                    )})
                }
            </div>
        </>
    )
}