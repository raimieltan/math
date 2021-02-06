import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Fragment } from 'react';
// import Homepage from './components/homepage';
import Login from './components/login';
import Signup from './components/signup';
import About from './components/about';

function App() {
  return (
    <Fragment>
      <Router>
        <div class="container">
          <Switch>
            {/* <Route exact path="/home" component={ () => <Homepage/> }/> */}
            <Route exact path="/login" component={ () => <Login/> }/>
            <Route exact path="/signup" component={ () => <Signup/> }/>
            <Route exact path="/about" component={ () => <About/>}/>
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
