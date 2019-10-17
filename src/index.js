import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter } from 'react-router-dom';
import './assets/styles/base.scss';
import configureStore from './config/configureStore';
import { Provider } from 'react-redux';
import LandingPage from './pages/Login';
import global from './pages/globals'

const store = configureStore();
const rootElement = document.getElementById('root');

const renderApp = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <Component />
      </HashRouter>
    </Provider>,
    rootElement
  );
};


renderApp(LandingPage);

if (module.hot) {
  module.hot.accept('./pages/Login', () => {
    const NextApp = require('./pages/Login').default
    renderApp(NextApp);
  });
}

registerServiceWorker();

