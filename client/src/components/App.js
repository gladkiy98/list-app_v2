import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from './Signin';
import SignUp from './Signup';
import Dashboard from './Dashboard';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import messages from './messages';
import '../App.css';

const App = ({lang}) => {
    return (
      <IntlProvider locale={lang} messages={messages[lang]}>
        <div>
          <Router>
            <div>
              <Route component={SignIn} exact path='/'  />
              <Route component={SignUp} exact path='/signup'  />
              <Route component={Dashboard} exact path='/dashboard'  />
            </div>
          </Router>
        </div>
      </IntlProvider>
    );
};

App.propTypes = {
  lang: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    lang: state.locale.lang
  };
}

export default connect (mapStateToProps)(App);
