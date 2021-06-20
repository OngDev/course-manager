import './App.css';

import * as React from "react";
import { Admin, Resource, ListGuesser } from 'react-admin';
import authProvider from './authProvider';
import { CourseList, CourseCreate, CourseEdit } from './Courses'
import dataProvider from './dataProvider'

const App = () => (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
        <Resource name="users" list={ListGuesser} />
        <Resource name="courses" list={CourseList} edit={CourseEdit} create={CourseCreate}/>
    </Admin>
);

export default App;
