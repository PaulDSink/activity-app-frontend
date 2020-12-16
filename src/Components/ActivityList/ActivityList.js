import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class ActivityList extends Component {
    constructor() {
        super()

    }

    render() {

        const activityList = this.props.activities.map((activity) => {
            return (
                <Link className="linktag" to={`/activities/${activity.id}`}>{activity.name}</Link>
            )
        })

        return (
            <div className="ActivityList">
                <h3>What activity are you looking to do?</h3>
                {activityList}
            </div>
        )
    }
}