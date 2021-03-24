import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const MenuContext = createContext()

// This component establishes what data can be used.
export const MenuProvider = (props) => {
    const [menus, setMenus] = useState([])
    // const [searchTerms, setSearchTerms ] = useState("")
    const currentUser = localStorage.getItem("YouAreWhatYouEat_user")

    const getMenus = () => {
        return fetch("http://localhost:8088/menus?_embed=ingredients")
        .then(res => res.json())
        .then(setMenus)
        .then(console.log(menus))
    }

    // const getMenuById = (id) => {
    //     return fetch(`http://localhost:8088/menus/${id}?_expand=location&_expand=customer`)
    //         .then(res => res.json())
    // }

    const addMenu = MenuObj => {
        return fetch("http://localhost:8088/menus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(MenuObj)
        })
        // .then(response => response.json())
    }

    const addMenuRecipes = (RecArr, menuId) => {
        const promiseArray = RecArr.map(RecObj => {
            RecObj.menuId = menuId
            fetch("http://localhost:8088/menurecipes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(RecObj)
            })
        })
        // return Promise.all()
        return Promise.all(promiseArray)
        // .then(response => response.json())
    }

    const getMenuRecipes = (menuId) => {
        return fetch(`http://localhost:8088/menurecipes?_menuId=${menuId}`)
        .then(res => res.json())
        .then(setMenus)
    }
    
    // const releaseMenu = MenuId => {
    //     return fetch(`http://localhost:8088/Menus/${MenuId}`, {
    //         method: "DELETE"
    //     })
    //         .then(getMenus)
    // }

    // const updateMenu = Menu => {
    //     return fetch(`http://localhost:8088/Menus/${Menu.id}`, {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify(Menu)
    //     })
    //       .then(getMenus)
    //   }

    /*
        You return a context provider which has the
        `Menus` state, `getMenus` function,
        and the `addMenu` function as keys. This
        allows any child elements to access them.
    */
    return (
        <MenuContext.Provider value={{
            menus, getMenus, addMenu, addMenuRecipes
        }}>
            {props.children}
        </MenuContext.Provider>
    )
}