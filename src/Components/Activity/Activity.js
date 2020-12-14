import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Activity extends Component {
    constructor() {
        super()

    }

    render() {

        const activity = this.props.activities.find(activity => {
            return activity.id === parseInt(this.props.match.params.id)
        })

        const locationList = activity.Locations.map(location => {
            return (
                <li>
                <Link to={`/locations/${location.id}`}>{location.name}</Link>
                </li>
            )
        })

        return (
            <div className="Activity">
                {activity.name}
                {locationList}
            </div>
        )
    }
}