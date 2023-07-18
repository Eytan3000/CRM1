import React, { useCallback } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Create from './pages/Create';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue, purple } from '@material-ui/core/colors';
import Layout from './components/Layout';
import Lead from './pages/Lead';
import { useState } from 'react';
import LeadsRender from './pages/LeadsRender';
import { DbFunctionsProvider } from './contexts/DbFunctionsContext';
import ErrorPage from './pages/ErrorPage';
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
  const [stages, setStages] = useState('');

  const stagesPassUp = useCallback((stage) => setStages(stage), []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <LeadsRender stagesPassUp={stagesPassUp} />,
        },
        {
          path: '/create',
          element: <Create />,
        },
        {
          path: '/lead/:leadId',
          element: <Lead stages={stages} />,
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
