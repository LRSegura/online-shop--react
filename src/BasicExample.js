import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";
import {Home} from "./Home";
import {About} from "./About";
import {Dashboard} from "./Dashboard";

export default function BasicExample() {
    return (
        <BrowserRouter>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                </ul>
                <hr />
                <Routes>
                    <Route path="/" element={<Home />}>
                        <Route path="about" element={<About />}/>
                        <Route path="dashboard" element={<Dashboard />}/>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}