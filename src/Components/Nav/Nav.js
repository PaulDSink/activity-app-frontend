import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Nav extends Component {
    constructor() {
        super()

    }

    navbar = () => {
        if(this.props.loggedIn) {
            return (
                <nav className="Navbar">
                    <Link className="linktag" to='/'>Return to Activities</Link>
                    <Link className="linktag" to={'/profile/' + this.props.user.id}>User Profile</Link>
                    <Link className="linktag" to='/logout'>Logout</Link>
                </nav>
            )
        } else {
            return (
            <nav className="Navbar">
                <Link className="linktag" to='/'>Return to Activities</Link>
                <Link className="linktag" to='/signup'>Signup</Link>
                <Link className="linktag" to='/login'>Login</Link>
            </nav>
            )
        }
    }

    render() {

        const nav = this.navbar()


        return (
            <div className="Nav">
                {nav}
            </div>
        )
    }
}