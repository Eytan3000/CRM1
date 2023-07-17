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
  const [leadId, setLeadId] = useState('');
  const [stages, setStages] = useState('');

  const idPassUp = useCallback((id) => setLeadId(id), []);
  const stagesPassUp = useCallback((stage) => setStages(stage), []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: (
            <LeadsRender idPassUp={idPassUp} stagesPassUp={stagesPassUp} />
          ),
        },
        {
          path: '/create',
          element: <Create />,
        },
        {
          path: '/lead',
          element: <Lead id={leadId} stages={stages} />,
        },
      ],
    },
  ]);

  return (
    // <ThemeProvider theme={theme}>
    //   <DbFunctionsProvider>
    //     <Router>
    //       <Layout>
    //         <Switch>
    //           <Route exact path="/">
    //             <LeadsRender idPassUp={idPassUp} stagesPassUp={stagesPassUp} />
    //           </Route>
    //           <Route path="/create">
    //             <Create />
    //           </Route>
    //           <Route path="/lead">
    //             <Lead id={leadId} stages={stages} />
    //           </Route>
    //         </Switch>
    //       </Layout>
    //     </Router>
    //   </DbFunctionsProvider>
    // </ThemeProvider>
    //-----------------------------------
    <ThemeProvider theme={theme}>
      <DbFunctionsProvider>
        <RouterProvider router={router} />
      </DbFunctionsProvider>
    </ThemeProvider>
  );
}

export default App;
