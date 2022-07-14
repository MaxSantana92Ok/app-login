import React from 'react';
import ReactDOM from 'react-dom/client';
import CustomTheme from './styles/CustomTheme';
import AppRouter from './route/AppRouter';
import {store} from './redux/store/Store';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import './main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomTheme>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </CustomTheme>
    </Provider>
  </React.StrictMode>
);
