import React from "react"
import { Route, Redirect } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"
import "./YouAreWhatYouEat.css"

export const YouAreWhatYouEat = () => (
    <>
        <Route
            render={() => {
                if (localStorage.getItem("YouAreWhatYouEat_user")) {
                    return (
                        <>
                            <NavBar />
                            <main>

                                <ApplicationViews />
                            </main>
                        </>
                    )
                } else {
                    return <Redirect to="/login" />;
                }
            }}
        />
        < Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>
    </>
)