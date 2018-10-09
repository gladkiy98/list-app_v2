import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';

addLocaleData(en);
addLocaleData(ru);

ReactDOM.render(<Provider store={store}><App /></Provider>,document.getElementById('root'));
