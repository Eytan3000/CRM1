import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Create from './pages/Create';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import Layout from './components/Layout';
import Lead from './pages/Lead';
import LeadsRender from './pages/LeadsRender';
import Login from './pages/Login';
import { DbFunctionsProvider } from './contexts/DbFunctionsContext';
import ErrorPage from './pages/ErrorPage';
import LoginForm from './components/auth/LoginForm';

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
      // element: <Layout />,
      // errorElement: <ErrorPage />,
      children: [
        {
          path: '/:login',
          element: <Login />,
        },
      ],
    },
    {
      path: '/crm/',
      element: <Layout />,
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
