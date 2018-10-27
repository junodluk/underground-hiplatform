/* eslint-disable */
import { API_URL, TOKEN_EXCHANGE_SERVER_URL, CLIENT_ID, REDIRECT_URL, SCOPE } from './api-variables';
import { getRandomStr, toQueryString } from 'utils';
import axios from 'axios';
import { Promise } from 'rsvp';

const executeLogin = () => {
  var state = getRandomStr(16);
  const queryString = toQueryString({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: SCOPE,
    redirect_uri: REDIRECT_URL,
    state: state
  });

  // TODO: save cookie/localStorage
  // res.cookie(stateKey, state);

  window.open(API_URL + queryString, '_self');
};

const exchangeTokenPromise = (code = '') => {
  return axios.post(`${TOKEN_EXCHANGE_SERVER_URL}/exchange`, { code })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
};

const refreshTokenPromise = () => {
  return new Promise((resolve, reject) => {
    return axios.post(`${TOKEN_EXCHANGE_SERVER_URL}/refresh`, { code })
      .then(function (res) {
        resolve(res);
      })
      .catch(function (err) {
        reject(error);
      });
  })

};

export { executeLogin, exchangeTokenPromise, refreshTokenPromise };