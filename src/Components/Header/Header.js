import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component {
    constructor() {
        super()

    }

    render() {

        return (
            <div className="Header">
                <div className="Header-title">
                    <h1>Trails App</h1>
                </div>
                <nav className="Navbar">
                    <Link className="linktag" to='/'>Return to Activities</Link>
                    <Link className="linktag" to='/signup'>Signup</Link>
                    <Link className="linktag" to='/login'>Login</Link>
                </nav>
            </div>
        )
    }
}