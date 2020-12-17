import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Activity extends Component {
    constructor() {
        super()

    }

    adminAddLocation = () => {
        if (this.props.user.admin) {
            return (
                <form onSubmit={this.props.addLocation}>
                    <input type='hidden' name='activityId' value={this.props.match.params.id}/>
                    Name:<input type='text' name='name'/>
                    Address:<input type='text' name='address'/>
                    Description:<input type='text' name='description'/>
                    <input type='submit' value='Add Location'/>
                </form>
            )
        }
    }

    render() {

        const activity = this.props.activities.find(activity => {
            return activity.id === parseInt(this.props.match.params.id)
        })

        const locationList = activity.Locations.map(location => {
            if (this.props.user.admin) {
                return (
                    <div>
                        <Link className="linktag" to={`/locations/${location.id}`}>{location.name}</Link>
                        <form onSubmit={this.props.deleteLocation}>
                            <input type='hidden' name='locationId' value={location.id}/>
                            <input type='submit' value='Delete Location' />
                        </form>
                    </div>
                )
            } else {
                return (
                    <div>
                        <Link className="linktag" to={`/locations/${location.id}`}>{location.name}</Link>
                    </div>
                )
            }
        })

        const addLocation = this.adminAddLocation()

        return (
            <div className="Activity">
                <h3>
                    Areas near you that offer {activity.name}!
                </h3>
                {locationList}
                {addLocation}
            </div>
        )
    }
}