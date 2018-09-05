import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from './Signin';
import SignUp from './Signup';
import Dashboard from './Dashboard';
import Welcome from './Welcome';

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Route component={SignIn} exact path='/signin'  />
          <Route component={SignUp} exact path='/signup'  />
          <Route component={Dashboard} exact path='/dashboard'  />
          <Route component={Welcome} exact path='/'  />
        </div>
      </Router>
    </div>
  );
};

export default App;
