import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Create from './pages/Create';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import Layout from './components/Layout';
import Lead from './pages/Lead';
import LeadsRender from './pages/LeadsRender';
import { DbFunctionsProvider } from './contexts/DbFunctionsContext';
import ErrorPage from './pages/ErrorPage';

import SignUp from './pages/SignUp';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import PrivateRoute from './components/auth/PrivateRoute';
import Dashboard from './pages/Dashboard';

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
      // element: <HomePage />,
      // errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: <HomePage />,
        },
        {
          path: 'signup',
          element: <SignUp />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'dashboard',
          element: (
            <PrivateRoute>
              <Dashboard />
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
