import React from "react";
import {Link} from "react-router-dom";

function App(){
    return (
        <div>
            <h1>Welcome STEM Students</h1>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    );
}