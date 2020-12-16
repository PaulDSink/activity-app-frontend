import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Logout extends Component {
    constructor() {
        super()

    }

    handleLogout = (event) => {
        event.preventDefault()

        this.props.logout(event)

        this.props.history.push('/')
    }

    render() {

        return (
            <div className="Logout">
                <h3>Are you sure you would like to logout?</h3>
                <form onSubmit={this.handleLogout}>
                    <input type='submit' value='Logout'/>
                </form>
            </div>
        )
    }
}