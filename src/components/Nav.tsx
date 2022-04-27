import React from "react";
import { NavLink } from "react-router-dom";

const Nav: React.FC = (props) => {
    return (
        <div className="nav">
            <ul>
                <li>
                    <NavLink exact to={'/'}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/new-tweet'}>
                        New Tweet
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Nav