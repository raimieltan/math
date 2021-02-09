import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react';
import Homepage from './components/homepage';
import Login from './components/login';
import About from './components/about';
import Profile from './components/profile';
import SignUp from './components/signup';
import Problem from './components/problem';

function App() {

  const [authentication, setAuthentication] = useState(false)

  const checkAuthentication = async () => {
    try {

      const response = await fetch("http://localhost:8000/verify")
      
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    checkAuthentication();
  }, [])


  const setAuth = (Boolean) => {
    setAuthentication(Boolean)
  }
  return (
    <Fragment>
      <Router>
        <div class="container">
          <Switch>
            <Route exact path="/" component={ () => <Homepage/> }/>
            <Route exact path="/login" component={ () => !authentication ? <Login setAuth={setAuth}/> : <Redirect to="/profile"/> }/>
            <Route exact path="/profile" component={ () => authentication ? <Profile setAuth={setAuth}/> : <Redirect to="/"/> }/>
            <Route exact path="/signup" component={ () => !authentication ? <SignUp setAuth={setAuth}/> : <Redirect to="/profile"/> }/>
            <Route exact path="/quiz" component={ () => <Problem/>}/>
            <Route exact path = "/profile" component = {() => <Profile/>}/>
            <Route exact path="/about" component={ () => <About/>}/>
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
