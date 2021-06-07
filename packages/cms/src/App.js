import './App.css';

import * as React from "react";
import { Admin, Resource, ListGuesser } from 'react-admin';
import crudProvider from 'ra-data-nestjsx-crud'
import authProvider from './authProvider';
import axios from './axios'

const fetchJson = async function (url, options = {}) {
    try {
        const res =  await axios(url, options);
    return {
        status: res.status,
        headers: res.headers,
        body: null,
        json: res.data
    }
    } catch (error) {
       throw new Error(error.message)
    }
}
const dataProvider = crudProvider('http://localhost:3456',fetchJson);
const App = () => (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
        <Resource name="users" list={ListGuesser} />
    </Admin>
);

export default App;
