import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import CourseList from './pages/Course/List';
import CourseCreate from './pages/Course/Create';
import CourseEdit from './pages/Course/Edit';
import Blog from './pages/Blog';
import UserList from './pages/User/List';
import UserCreate from './pages/User/Create';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        {
          path: 'user',
          element: <UserList />
        },
        {
          path: 'user/create',
          element: <UserCreate />
        },
        { path: 'courses', element: <CourseList /> },
        { path: 'courses/create', element: <CourseCreate /> },
        { path: 'courses/:id', element: <CourseEdit /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
