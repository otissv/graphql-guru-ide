import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import init from './core/global/init-global';
import store from './store';
import { ThemeProvider } from 'styled-components';
import theme from './styled/theme.js';
import './index.css';

window.app = window.app || {};

init({ app: window.app, store });

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router history={browserHistory} routes={routes(store)} />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
