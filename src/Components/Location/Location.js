import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Location extends Component {
    constructor() {
        super()

    }

    adminAddTrail = () => {
        if (this.props.user.admin) {
            return (
                <form onSubmit={this.props.addTrail}>
                    <input type='hidden' name='locationId' value={this.props.match.params.id}/>
                    Name:<input type='text' name='name'/>
                    Length:<input type='text' name='length'/>
                    <input type='submit' value='Add Trail'/>
                </form>
            )
        }
    }

    locationActivity = (event) => {
        event.preventDefault()

        let data = {
            locationId: parseInt(this.props.match.params.id),
            activityId: parseInt(event.target.value)
        }

        console.log(data)

        if (event.target.checked) {
            this.props.locationBindActivity(data)
            console.log('checked')
        } else {
            this.props.locationUnbindActivity(data)
            console.log('unchecked')
        }
    }

    render() {

        const location = this.props.locations.find(location => {
            return location.id === parseInt(this.props.match.params.id)
        })

        const locationActivities = location.Activities.map(({ id }) => id)


        const activityList = this.props.activities.map(activity => {

            if (this.props.user.admin) {
                console.log(`${activity.name} can be done at this location`)
                return (
                    <div>
                        <form>
                            <input type='checkbox' id='activityCheckbox' name='activityId' value={activity.id} checked={locationActivities.includes(activity.id)} onChange={this.locationActivity}/>
                            <label for='activityCheckbox'>{activity.name}</label>
                        </form>
                    </div>
                )
            } else {
                if(locationActivities.includes(activity.id)) {
                    console.log(`${activity.name} can be done at this location`)
                    return (
                        <div>
                            <p>{activity.name}</p>
                        </div>
                    )
                }
            }
        })


        const trailList = location.Trails.map(trail => {
            if (this.props.user.admin) {
                return (
                    <div>
                        <h4>{trail.name}</h4>
                        <p>{trail.length}</p>
                        <form onSubmit={this.props.deleteTrail}>
                            <input type='hidden' name='trailId' value={trail.id}/>
                            <input type='submit' value='Delete Trail' />
                        </form>
                    </div>
                )
            } else {
                return (
                    <div>
                        <h4>{trail.name}</h4>
                        <p>{trail.length}</p>
                    </div>
                )
            }
        })

        const addTrail = this.adminAddTrail()

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
                {addTrail}
            </div>
        )
    }
}