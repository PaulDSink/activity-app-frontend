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
                <p>{activity.name}</p>
            )
        })

        const trailList = location.Trails.map(trail => {
            return (
                <div>
                    <h4>{trail.name}</h4>
                    <p>{trail.length}</p>
                </div>
            )
        })

        return (
            <div className="Location">
                <h2>
                    {location.name}
                </h2>
                <p>{location.address}</p>
                <h3>Activities Offered Here:</h3>
                {activityList}
                <h3>Trails:</h3>
                {trailList}
            </div>
        )
    }
}