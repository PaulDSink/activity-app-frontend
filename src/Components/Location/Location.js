import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Location extends Component {
    constructor() {
        super()

    }

    render() {

        const location = this.props.locations.find(location => {
            return location.id === parseInt(this.props.match.params.id)
        })

        const activityList = location.Activities.map(activity => {
            return (
                <li>{activity.name}</li>
            )
        })

        return (
            <div className="Activity">
                {location.name}
                {activityList}
            </div>
        )
    }
}