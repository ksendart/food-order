import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import store from './store';
import { FoodOrderService } from './api/services/food-order.service';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { FoodOrderServiceProvider } from './components/context/food-order.service.context';
import { ErrorBoundary } from './components/error/error-boundary';
import { AuthServiceProvider } from './components/context/auth.service.context';
import { AuthService } from './api/services/auth.service';

const authService = new AuthService();
const foodOrderService = new FoodOrderService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <AuthServiceProvider value={authService}>
      <FoodOrderServiceProvider value={foodOrderService}>
        <Router>
          <App/>
        </Router>
      </FoodOrderServiceProvider>
      </AuthServiceProvider>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
