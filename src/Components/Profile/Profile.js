import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Profile extends Component {
    constructor() {
        super()

    }

    handleDelete = (event) => {
        event.preventDefault()

        this.props.deleteUser(event)

        this.props.history.push('/')
    }


    render() {


        return (
            <div className="Profile">
                <form onSubmit={this.props.updateUser}>
                    <input type='hidden' name='userId' value={this.props.user.id}/>
                    Name:<input type='text' name='name' placeholder={this.props.user.name}/><br/>
                    Username:<input type='text' name='username' placeholder={this.props.user.username}/><br/>
                    <input type='submit' value='Update Profile'/>
                </form>
                <form onSubmit={this.handleDelete}>
                    <input type='hidden' name='userId' value={this.props.user.id}/>
                    <input type='submit' value='DELETE Profile'/>
                </form>
            </div>
        )
    }
}