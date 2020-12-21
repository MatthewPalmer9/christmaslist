import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './components/Index.jsx';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Index} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
