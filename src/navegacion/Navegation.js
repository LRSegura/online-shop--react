import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {Home} from "../Home";
import React from "react";
import Sales from "../sales/Sales";
import User from "../user/User";

export function Navigation() {
    return (
        <BrowserRouter>
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <Link className="nav-link active" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to="/sales">Sales</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to="/user">User</Link>
                </li>
            </ul>
            <div>
                <hr/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/sales" element={<Sales/>}/>
                    <Route path="/user" element={<User/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}