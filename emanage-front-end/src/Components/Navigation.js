import React, { useRef } from "react";
import '../Style/Navigation.css'
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";


function Navigation() {

    // hamburger click event

    var bug = 0

    var refBurger = useRef()
    var refNavigationRight=useRef()

    const hamBurgerClicked = () => {

        if (bug === 0) {
            refBurger.current.style.rotate = "90deg"
            refNavigationRight.current.style.transform = "translateX(0px)"
            bug = 1
        }
        else {
            refBurger.current.style.rotate = "0deg"
            refNavigationRight.current.style.transform = "translateX(201px)"
            bug = 0
        }
    }

    return (
        <div className="mainContainer">
            <div className="navigationContainer">

                <div className="navigationLeft">

                    <div className="navCircleContainer">
                        <div className="navCircle"></div>
                    </div>

                    <div className="navTitleIcon">
                        <img src="../Icons/logo.png" alt="logo" />

                        <div className="navTitle">
                            <span className="navTitle-E">E</span>
                            <span className="navTitle-Manage">manage</span>
                        </div>
                    </div>

                </div>

                <div ref={refNavigationRight} className="navigationRight">

                    <Link to="/" className="navMenu viewMenu">
                        <span className="material-symbols-outlined">visibility</span>
                        View
                    </Link>
                    <Link to="/create" className="navMenu createMenu">
                        <span className="material-symbols-outlined">edit_square</span>
                        Create
                    </Link>
                    <Link to="/update" className="navMenu updateMenu">
                        <span className="material-symbols-outlined">convert_to_text</span>
                        update
                    </Link>
                    <Link to="/delete" className="navMenu deleteMenu">
                        <span className="material-symbols-outlined">delete</span>
                        <p>Delete</p>
                    </Link>

                </div>

                <div className="hamburger">
                    <span className="material-symbols-outlined burger" ref={refBurger} onClick={hamBurgerClicked}>menu</span>
                </div>
            </div>
            <Outlet></Outlet>
        </div>
    )
}


export default Navigation