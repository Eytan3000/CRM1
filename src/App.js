import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Notes from './pages/Notes';
import Create from './pages/Create';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import Layout from './components/Layout';
import Lead from './pages/Lead';
import IdContext from './components/IdContext';
import { useState } from 'react';
import LeadPageLayout from './components/LeadPageLayout';

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

function App() {
  const [leadId, setLeadId] = useState('');

  const idPassUp = (id) => setLeadId(id);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Notes idPassUp={idPassUp} />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/lead">
              <Lead id={leadId} />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
