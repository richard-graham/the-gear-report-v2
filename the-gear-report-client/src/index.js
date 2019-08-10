import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import jwtDecode from 'jwt-decode'
import axios from 'axios'

import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core' 
import themeFile from './util/theme'

//Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userActions'

//Stripe
import {StripeProvider, Elements} from 'react-stripe-elements';
import STRIPE_PUBLISHABLE from './components/stripe/constants/stripe';


axios.defaults.baseURL = 'https://us-central1-the-gear-report-a2ce8.cloudfunctions.net/api'

const token = localStorage.FBIdToken
if(token){
  const decodedToken = jwtDecode(token) // decodedToken.exp hold the expiry time of the token
  if(decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

const theme = createMuiTheme(themeFile)

ReactDOM.render(
  <StripeProvider apiKey={STRIPE_PUBLISHABLE}>
    <Elements>
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </MuiThemeProvider>
    </Elements>
  </StripeProvider>, 
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
