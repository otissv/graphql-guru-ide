import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import init from './core/global/init-global';
import store from './store';

import normalizeStyled from 'normalize-styled';
import { injectGlobal } from 'styled-components';
import { ThemeProvider } from 'styled-components';
import theme, { baseStyles } from './styled/theme.js';

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
