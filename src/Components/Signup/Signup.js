import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Signup extends Component {
    constructor() {
        super()

    }

    render() {

        return (
            <div className="Signup">
                <form onSubmit={this.props.signup}>
                    Name:<input type='text' name='name'/><br/>
                    Username:<input type='text' name='username'/><br/>
                    Password:<input type='text' name='password'/><br/>
                    <input type='submit' value='Signup'/>
                </form>
            </div>
        )
    }
}