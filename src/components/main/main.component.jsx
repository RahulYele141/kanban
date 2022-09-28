import React from "react";
import { Board, Navbar, Sidebar } from "..";
import './main.style.css'

const Main = () => {
    return (
        <div className="main-container">
            <div className='navbar'>
                <Navbar />
            </div>
            <div className='sidebar'>
                <Sidebar />
            </div>
            <div className='board'>
                <Board />
            </div>

        </div>
    )
}

export default Main