import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class ActivityList extends Component {
    constructor() {
        super()

    }

    render() {

        const activityList = this.props.activities.map((activity) => {
            return (
                <li>
                    <Link to={`/activities/${activity.id}`}>{activity.name}</Link>
                </li>
            )
        })

        return (
            <div className="ActivityList">
                {activityList}
            </div>
        )
    }
}