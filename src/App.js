import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import {Route, Link, Switch, Redirect} from 'react-router-dom'

import ActivityList from './Components/ActivityList/ActivityList'
import Activity from './Components/Activity/Activity'
import Location from './Components/Location/Location'
import Header from './Components/Header/Header'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import Logout from './Components/Logout/Logout'
import Profile from './Components/Profile/Profile'

const backendUrl = 'https://trails-app-api.herokuapp.com/api'

export default class App extends Component {
  constructor() {
    super()

    this.state={
      activities: [],
      locations: [],
      loggedIn: false,
      user: {},
    }
  }

  login = async (event) => {
    event.preventDefault()

    let response = await axios.post(`${backendUrl}/auth/login`, {
      username: event.target.username.value,
      password: event.target.password.value
    })

    this.setState({
      loggedIn: true,
      user: response.data.user,
    })
  }

  signup = async (event) => {
    event.preventDefault()

    await axios.post(`${backendUrl}/auth/signup`, {
      name: event.target.name.value,
      username: event.target.username.value,
      password: event.target.password.value
    })

    this.login(event)

  }

  logout = async () => {
    await axios.get(`${backendUrl}/auth/logout`)

    this.setState({
      loggedIn: false,
      user: {},
    })
  }

  updateUser = async (event) => {
    event.preventDefault()

    let response = await axios.put(`${backendUrl}/users/profile/${event.target.userId.value}`, {
      name: event.target.name.value,
      username: event.target.username.value,
    })

    let user = response.data.user[1][0]

    this.setState({
      user: user
    })
  }

  deleteUser = async (event) => {
    event.preventDefault()

    await axios.delete(`${backendUrl}/users/profile/${event.target.userId.value}`)

    this.logout()
  }

  getActivities = async () => {
    const response = await axios(`${backendUrl}/activities`)

    this.setState({
      activities: response.data.activities,
    })
  }

  addActivity = async (event) => {
    event.preventDefault()

    await axios.post(`${backendUrl}/activities`, {
      name: event.target.name.value
    })

    this.getActivities()
  }

  deleteActivity = async (event) => {
    event.preventDefault()

    await axios.delete(`${backendUrl}/activities/${event.target.activityId.value}`)

    this.getActivities()
  }


  getLocations = async () => {
    const response = await axios(`${backendUrl}/locations`)

    this.setState({
      locations: response.data.locations,
    })
  }


  addLocation = async (event) => {
    event.preventDefault()

    const response = await axios.post(`${backendUrl}/locations`, {
      name: event.target.name.value,
      address: event.target.address.value,
      description: event.target.description.value,
    })

    const data = {
      locationId: response.data.newLocation.id,
      activityId: event.target.activityId.value
    }

    this.locationBindActivity(data)
  }


  locationBindActivity = async (data) => {

    await axios.post(`${backendUrl}/locations/${data.locationId}/addactivity`, {
      id: data.activityId,
    })

    this.getActivities()
  }


  deleteLocation = async (event) => {
    event.preventDefault()

    await axios.delete(`${backendUrl}/locations/${event.target.locationId.value}`)

    this.getActivities()
  }
  

  addTrail = async (event) => {
    event.preventDefault()

    await axios.post(`${backendUrl}/locations/${event.target.locationId.value}/newtrail`, {
      name: event.target.name.value,
      length: event.target.length.value,
    })

    this.getLocations()
  }

  deleteTrail = async (event) => {
    event.preventDefault()

    await axios.delete(`${backendUrl}/trails/${event.target.trailId.value}`)

    this.getLocations()
  }


  componentDidMount = async () => {
    this.getActivities()
    this.getLocations()
  }

  render() {

    return (
      <div className="App">
        <Header
        loggedIn={this.state.loggedIn}
        user={this.state.user}
        />
        <main>
          <Switch>
            <Route exact path='/'
              component={() => <ActivityList
              addActivity={this.addActivity}
              deleteActivity={this.deleteActivity}
              activities={this.state.activities}
              user={this.state.user}
              />}
            />
            <Route path='/signup'
              component={(routerProps) =>
              <Signup
              {...routerProps}
              signup={this.signup}
              />}
            />
            <Route path='/login'
              component={(routerProps) =>
              <Login
              {...routerProps}
              login={this.login}
              />}
            />
              <Route path='/logout'
              component={(routerProps) =>
              <Logout
              {...routerProps}
              logout={this.logout}
              />}
            />
            <Route path='/activities/:id'
              component={(routerProps) => <Activity 
              {...routerProps}
              addLocation={this.addLocation}
              deleteLocation={this.deleteLocation}
              activities={this.state.activities}
              user={this.state.user}
              />}
            />
            <Route path='/locations/:id'
              component={(routerProps) => <Location 
              {...routerProps}
              addTrail={this.addTrail}
              deleteTrail={this.deleteTrail}
              locations={this.state.locations}
              user={this.state.user}
              />}
            />
            <Route
              path='/profile/:id'
              component={(routerProps) => <Profile
              {...routerProps}
              user={this.state.user}
              updateUser={this.updateUser}
              deleteUser={this.deleteUser}
              />}
            />
          </Switch>
        </main>
      </div>
    );
  }
}