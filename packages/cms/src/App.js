import './App.css';

import * as React from "react";
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import authProvider from './authProvider';

// FOR SERVER INTEGRATION
// const httpClient = (url, options = {}) => {
//   if (!options.headers) {
//       options.headers = new Headers({ Accept: 'application/json' });
//   }
//   const { token } = JSON.parse(localStorage.getItem('user'));
//   options.headers.set('Authorization', `Bearer ${token}`);
//   return fetchUtils.fetchJson(url, options);
// };
// const dataProvider = simpleRestProvider('http://localhost:3000', httpClient);

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const App = () => (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
        <Resource name="users" list={ListGuesser} />
    </Admin>
);

export default App;
