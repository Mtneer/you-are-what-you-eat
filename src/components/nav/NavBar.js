import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Button from "react-bootstrap/Button"

export const NavBar = (props) => {
    const history = useHistory()

    return (
        <>
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/recipes">Recipes</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/menus">Menus</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/shopping-list">Shopping List</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/nutrition ">Nutrition</Link>
            </li>
        </ul>
        <Button className="logout" onClick={() => {localStorage.removeItem("YouAreWhatYouEat_user"); history.push("/login")}}>
            Logout
        </Button>
        </>
    )
}