import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Signup extends Component {
    constructor() {
        super()

    }

    handleSignup = (event) => {
        event.preventDefault()

        this.props.signup(event)

        this.props.history.push('/')
    }

    render() {

        return (
            <div className="Signup">
                <form onSubmit={this.handleSignup}>
                    Name:<input type='text' name='name'/><br/>
                    Username:<input type='text' name='username'/><br/>
                    Password:<input type='text' name='password'/><br/>
                    <input type='submit' value='Signup'/>
                </form>
            </div>
        )
    }
}