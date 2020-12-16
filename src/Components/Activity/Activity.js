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
                <Link className="linktag" to={`/locations/${location.id}`}>{location.name}</Link>
            )
        })

        return (
            <div className="Activity">
                <h3>
                    Areas near you that offer {activity.name}!
                </h3>
                {locationList}
            </div>
        )
    }
}