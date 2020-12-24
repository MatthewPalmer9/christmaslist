import React, {Component} from 'react';
import Index from './components/Index.jsx';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { api, API_ROOT } from './services/api';

export default class App extends Component {

  state = {
    loading: true,
    signupForm: true,
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
    localStorage.setItem("token", data.jwt);
    this.setState({ authUser: data.user });
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({
      authUser: {},
    });
  };

  updateUser = data => {
    this.setState({
      authUser: data.user,
    })
  }


  render() {
    if(this.state.loading) {
      return <div><h2>Loading...</h2></div>
    } else {
      return(
        <>
          <Router>
            <Switch>
              <Route exact path="/">
                {this.state.authUser.id ? <Redirect to="/dashboard" /> : <Landing signupForm={this.state.signupForm} onLogin={this.login} />}
              </Route>

              <Route path='/dashboard' render={(props) => <Dashboard {...props} authUser={this.state.authUser} />} />

            </Switch>
          </Router>
        </>
      )
    }
  }

}
