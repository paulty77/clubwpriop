import fetch from 'isomorphic-fetch'
import { URL_WEB_API_PROD, URL_WEB_API_DEV } from './globals'

export function callAPI ({ action, body = null, method = 'POST' }) {
  const url = process.env.NODE_ENV === 'dev' ? URL_WEB_API_DEV : URL_WEB_API_PROD
  return fetch(url + action, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: body
  })
  .then((res) => res.json())
}

export default callAPI
