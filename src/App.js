import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import {Route, Link, Switch} from 'react-router-dom'

import ActivityList from './Components/ActivityList/ActivityList'
import Activity from './Components/Activity/Activity'
import Location from './Components/Location/Location'

const backendUrl = 'https://trails-app-api.herokuapp.com/api'

export default class App extends Component {
  constructor() {
    super()

    this.state={
      activities: [],
      locations: [],
    }
  }

  getActivities = async () => {
    const response = await axios(`${backendUrl}/activities`)

    this.setState({
      activities: response.data.activities,
    })
  }

  getLocations = async () => {
    const response = await axios(`${backendUrl}/locations`)

    this.setState({
      locations: response.data.locations,
    })
  }

  componentDidMount = async () => {
    this.getActivities()
    this.getLocations()
  }

  render() {

    return (
      <div className="App">
        <h1>Trails App</h1>
        <nav>
          <Link to='/'>Activities</Link>
        </nav>
        <main>
          <Switch>
            <Route exact path='/'
            component={() => <ActivityList
            activities={this.state.activities}
            />}
            />
            <Route path='/activities/:id'
            component={(routerProps) => <Activity 
            {...routerProps}
            activities={this.state.activities}
            />}
            />
            <Route path='/locations/:id'
            component={(routerProps) => <Location 
            {...routerProps}
            locations={this.state.locations}
            />}
            />
          </Switch>
        </main>
      </div>
    );
  }
}