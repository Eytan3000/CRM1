import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Create from './pages/Create';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import Layout from './components/Layout';
import Lead from './pages/Lead';
import { useState } from 'react';
import LeadsRender from './pages/LeadsRender';
import { insertNewLead } from './helpers/dbFunctions';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe',
    },
    secondary: purple,
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

export const addLeadToDBContext = React.createContext();

function addLeadToDB(lead) {
  insertNewLead(lead);
}

function App() {
  const [leadId, setLeadId] = useState('');
  const [stages, setStages] = useState('');

  const idPassUp = (id) => setLeadId(id);
  const stagesPassUp = (stage) => setStages(stage);

  return (
    <ThemeProvider theme={theme}>
      <addLeadToDBContext.Provider value={addLeadToDB}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/">
                <LeadsRender idPassUp={idPassUp} stagesPassUp={stagesPassUp} />
              </Route>
              <Route path="/create">
                <Create />
              </Route>
              <Route path="/lead">
                <Lead id={leadId} stages={stages} />
              </Route>
            </Switch>
          </Layout>
        </Router>
      </addLeadToDBContext.Provider>
    </ThemeProvider>
  );
}

export default App;
