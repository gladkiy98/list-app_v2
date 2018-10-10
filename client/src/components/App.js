import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import messages from './messages';
import { IntlProvider } from 'react-intl';
import SignIn from './Signin';
import SignUp from './Signup';
import Dashboard from './Dashboard';

const App = ({ lang }) => {
  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      <Router>
        <div>
          <Route component={SignIn} exact path="/" />
          <Route component={SignUp} path="/signup" />
          <Route component={Dashboard} path="/dashboard" />
        </div>
      </Router>
    </IntlProvider>
  );
};

App.propTypes = {
  lang: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    lang: state.locale.lang
  };
}

export default connect (mapStateToProps)(App);
