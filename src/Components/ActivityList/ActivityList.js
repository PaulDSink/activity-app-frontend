import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class ActivityList extends Component {
    constructor() {
        super()

    }

    adminAddActivity = () => {
        if (this.props.user.admin) {
            return (
                <form onSubmit={this.props.addActivity}>
                    Name:<input type='text' name='name'/>
                    <input type='submit' value='Add'/>
                </form>
            )
        }
    }

    render() {

        const activityList = this.props.activities.map((activity) => {
            if (this.props.user.admin) {
                return (
                    <div>
                        <Link className="linktag" to={`/activities/${activity.id}`}>{activity.name}</Link>
                        <form onSubmit={this.props.deleteActivity}>
                            <input type='hidden' name='activityId' value={activity.id}/>
                            <input type='submit' value='Delete Activity' />
                        </form>
                    </div>
                )
            } else {
                return (
                    <div>
                        <Link className="linktag" to={`/activities/${activity.id}`}>{activity.name}</Link>
                    </div>
                )
            }
        })

        const addActivity = this.adminAddActivity()

        return (
            <div className="ActivityList">
                <h3>What activity are you looking to do?</h3>
                {activityList}
                {addActivity}
            </div>
        )
    }
}