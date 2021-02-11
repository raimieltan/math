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
import MainPage from './components/main-page'

function App() {

  const [authentication, setAuthentication] = useState(false)

  const checkAuthentication = async () => {
    try {
      const res = await fetch("http://localhost:8000/verify", {
        headers: { 'Authorization': 'Bearer ' + localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setAuthentication(true) : setAuthentication(false);
    } catch (err) {
      console.error(err.message);
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
            <Route exact path="/" component={ () => !authentication ? <Homepage/>: <Redirect to="/profile"/> }/>
            <Route exact path="/login" component={ () => !authentication ? <Login setAuth={setAuth}/> : <Redirect to="/profile"/> }/>
            <Route exact path="/signup" component={ () => !authentication ? <SignUp setAuth={setAuth}/> : <Redirect to="/profile"/> }/>
            {/* <Route exact path="/profile" component={ () => authentication ? <Profile setAuth={setAuth}/> : <Redirect to="/login"/> }/> */}

            <Route exact path="/main-page" component={ () =>  <MainPage/> }/>
            <Route exact path="/profile" component={ () =>  <Profile/> }/>
            <Route exact path="/quiz" component={ () => <Problem/>}/>
            <Route exact path="/about" component={ () => <About/>}/>
           
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
