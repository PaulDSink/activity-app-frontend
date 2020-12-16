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
        <Header
        loggedIn={this.state.loggedIn}
        user={this.state.user}
        />
        <main>
          <Switch>
            <Route exact path='/'
              component={() => <ActivityList
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
              activities={this.state.activities}
              />}
            />
            <Route path='/locations/:id'
              component={(routerProps) => <Location 
              {...routerProps}
              locations={this.state.locations}
              />}
            />
            <Route
              path='/profile/:id'
              component={(routerProps) => <Profile
              {...routerProps}
              user={this.state.user}
              updateUser={this.updateUser}
              />}
            />
          </Switch>
        </main>
      </div>
    );
  }
}