import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Admin from './components/admin';
import User from './components/user';
import Votedetails from './components/votedetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>          
          <Route exact path="/" component={Login} />    
          <Route exact path="/admin" component={Admin} /> 
          <Route exact path="/user" component={User} />
          <Route exact path="/votedetails" component={Votedetails} /> 
                   
        </Switch>
      </Router>
    </div>
  );
}

export default App;
