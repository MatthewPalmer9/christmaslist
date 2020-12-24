import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './components/Index.jsx';
import SignUp from './components/SignUp.jsx';
import LogIn from './components/LogIn.jsx';

export default class App extends Component {

  state = {
    loading: true,
    signupForm: true,
    authUser: {}
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000)
  }


  render() {
    if(this.state.loading) {
      return <div><h2>Loading...</h2></div>
    } else {
      return(
        <>
          <Router>
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={LogIn} />
            </Switch>
          </Router>
        </>
      )
    }
  }

}
