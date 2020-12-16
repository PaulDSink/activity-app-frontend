import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Nav from '../Nav/Nav'

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
                <Nav
                loggedIn={this.props.loggedIn}
                />
            </div>
        )
    }
}