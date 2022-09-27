import React from "react";
import { Board, Navbar, Sidebar } from "..";
import './main.style.css'

const Main = () => {
    return (
        <div className="main-container">
            <div className='navbar'>
                <Navbar ></Navbar>
            </div>
            <div className='board'>
                <Board ></Board>
            </div>
            <div className='sidebar'>
                <Sidebar ></Sidebar>
            </div>
        </div>
    )
}

export default Main