import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Create from './pages/Create';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import Layout from './components/Layout';
import Lead from './pages/Lead';
import LeadsRender from './pages/LeadsRender';
import { DbFunctionsProvider } from './contexts/DbFunctionsContext';
import ErrorPage from './pages/ErrorPage';

import HomePage from './pages/HomePage';
import PrivateRoute from './components/auth/PrivateRoute';
import Dashboard from './pages/Dashboard';
import ProfileLayout from './components/ProfileLayout';
import LoginForm from './components/auth/LoginForm';
import SignUnForm from './components/auth/SignUnForm';
import ForgotPassForm from './components/auth/ForgotPassForm';
import UpdateProfileForm from './components/auth/UpdateProfileForm';

//-------------------------------------------------

const theme = createTheme({
  palette: {
    primary: {
      // main: '#fefefe',
      main: '#f5f7fa',
    },
    secondary: purple,
  },
  // typography: {
  //   fontFamily: 'Quicksand',
  //   fontWeightLight: 400,
  //   fontWeightRegular: 500,
  //   fontWeightMedium: 600,
  //   fontWeightBold: 700,
  // },
});
//-------------------------------------------------

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProfileLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: <HomePage />,
        },
        {
          path: 'signup',
          element: <SignUnForm />,
        },
        {
          path: 'login',
          element: <LoginForm />,
        },
        {
          path: 'dashboard',
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
        },
        {
          path: 'Forgot-password',
          element: <ForgotPassForm />,
        },
        {
          path: 'update-profile',
          element: (
            <PrivateRoute>
              <UpdateProfileForm />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: '/crm/',
      element: (
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: <LeadsRender />,
        },
        {
          path: 'create',
          element: <Create />,
        },
        {
          path: 'lead/:leadId',
          element: <Lead />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <DbFunctionsProvider>
        <RouterProvider router={router} />
      </DbFunctionsProvider>
    </ThemeProvider>
  );
}

export default App;
