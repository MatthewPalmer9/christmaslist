import React, {Component} from 'react';
import Navbar from './components/Navbar.jsx';
import Landing from './containers/Landing.jsx';
import Dashboard from './containers/Dashboard.jsx';
import Login from './components/LogIn.jsx';
import SignUp from './components/SignUp.jsx';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { api, API_ROOT } from './services/api';

export default class App extends Component {

  state = {
    loading: true,
    loggedIn: false,
    authUser: {}
  }

  

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      api.auth.getCurrentSession().then(resp => {
        if (!resp.error) {
          this.setState({ authUser: resp.user, loading: false })
        }
      });
    } else {
      this.setState({ loading: false })

      // This is meant to ping heroku & wake up the server 
      fetch(API_ROOT)
    }
  }

  login = data => {
    localStorage.setItem('token', data.jwt)
    this.setState({ 
      authUser: data.user,
      loggedIn: true
    });
  };

  logout = () => {
    localStorage.removeItem('token')
    this.setState({
      authUser: {},
      loggedIn: false
    });
  };

  updateUser = data => {
    this.setState({
      authUser: data.user
    });
  };


  render() {
    if(this.state.loading) {
      return <div><h2>Loading...</h2></div>
    } else {
      return(
        <>
          <Router>
            <Navbar state={this.state} handleLogout={this.logout}/>
              <Route exact path="/">
                {this.state.authUser.id ? <Redirect to="/dashboard" /> : <Landing signupForm={this.state.signupForm} onLogin={this.login} />}
              </Route>

              <Route exact path="/login" render={(props) => <Login {...props} state={this.state} login={this.login} />} />
              <Route exact path="/signup" render={(props) => <SignUp {...props} />} />
              <Route path='/dashboard' render={(props) => <Dashboard {...props} authUser={this.state.authUser} />} />
          </Router>
        </>
      )
    }
  }

}
