import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Login extends Component {
    constructor() {
        super()

    }

    handleLogin = (event) => {
        event.preventDefault()

        this.props.login(event)

        this.props.history.push('/')
    }

    render() {

        return (
            <div className="Login">
                <form onSubmit={this.handleLogin}>
                    Username:<input type='text' name='username'/><br/>
                    Password:<input type='text' name='password'/><br/>
                    <input type='submit' value='Login'/>
                </form>
            </div>
        )
    }
}