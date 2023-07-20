import React, { useContext, useEffect, useState } from 'react';
import NewLeadModal from '../components/leadsRender/NewLeadModal';
import AddStagePopper from '../components/leadsRender/AddStagePopper';
import { loadCards, loadStagesContext } from '../contexts/DbFunctionsContext';
import LeadRenderColumn from '../components/leadsRender/LeadRenderColumn';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { renderContext } from '../contexts/DbFunctionsContext';
import { useMediaQuery } from '@mui/material';
import { layoutNameContext } from '../contexts/DbFunctionsContext';
import SettingsIcon from '@mui/icons-material/Settings';
import VerticalMenuPop from '../components/auxs/VerticalMenuPop';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

//----------------------------------------------------------

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBUjDRbNol-XzWCSVEPkl6VB-15gJI4oTM',
  authDomain: 'mycrm-a7912.firebaseapp.com',
  databaseURL:
    'https://mycrm-a7912-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'mycrm-a7912',
  storageBucket: 'mycrm-a7912.appspot.com',
  messagingSenderId: '921120278026',
  appId: '1:921120278026:web:b33d9ef0a4bfcc8f7081f3',
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

//----------------------------------------------------------
function LeadsRender() {
  console.log('LeadsRender');

  const loadCardsContentCtx = useContext(loadCards);
  const loadStagesCtx = useContext(loadStagesContext);
  const { reRender } = useContext(renderContext);
  const { setLayoutName } = useContext(layoutNameContext);

  const [leads, setLeads] = useState([]);
  const [stages, setStages] = useState([]);
  const [open, setOpen] = React.useState(null);
  const [deleteStageShow, setDeleteStageShow] = useState(false);

  const wrapMaxWidth = (1300 * stages.length) / 5; // when does the window stop squeezing and start pushing
  const isDesktop = useMediaQuery(
    `(min-width: 900px) and (max-width: ${wrapMaxWidth}px)`
  ); // the mediaQuery is affected by the number of stages.

  useEffect(() => {
    // Function to write user data to Firebase
    function writeUserData(userId, name, email, url) {
      const db = getDatabase(app);
      const reference = ref(db, 'users/' + userId);

      set(reference, {
        userName: name,
        email: email,
        website: url,
      });
    }

    // Call writeUserData when the component mounts
    writeUserData(
      'YoelKrief',
      'eytan krief2',
      'Orian@gmail.com',
      'www.kriefsound.com'
    );
  }, []);

  useEffect(() => {
    (async () => {
      const arr = await loadCardsContentCtx();
      setLeads(arr);
      setLayoutName('Main Pipeline');
    })();
  }, [reRender]);

  //load Stages
  useEffect(() => {
    (async () => {
      const arr = await loadStagesCtx();
      setStages(arr);
    })();
  }, [deleteStageShow, reRender]);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleClickEdit = () => {
    handleCloseMenu();
    setDeleteStageShow(true);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="flex-end"
        paddingBottom={2}
        width="100%">
        <NewLeadModal />
        <AddStagePopper setStages={setStages} />
        <Box marginLeft="auto">
          {deleteStageShow && (
            <Button
              onClick={() => setDeleteStageShow(false)}
              variant="outlined"
              style={{ marginRight: 10 }}>
              Stop Editing
            </Button>
          )}
          <IconButton
            onClick={(e) => {
              handleOpenMenu(e);
            }}>
            <SettingsIcon color="primary" style={{ marginTop: 5 }} />
          </IconButton>
        </Box>
      </Box>

      <VerticalMenuPop
        edit={true}
        open={open}
        handleCloseMenu={() => handleCloseMenu()}
        handleClickEdit={() => handleClickEdit()}
      />

      <Grid
        container
        rowSpacing={2}
        columnSpacing={5}
        sx={{
          flexWrap: isDesktop ? 'nowrap' : 'wrap',
          paddingRight: '30px',
        }}>
        {stages.map((stage) => (
          <Grid
            id="first-grid-id"
            item
            key={stage.id}
            sm={12}
            md={12 / stages.length}
            minWidth={210}>
            <LeadRenderColumn
              stage={stage}
              leads={leads}
              setDeleteStageShow={setDeleteStageShow}
              deleteStageShow={deleteStageShow}
              setStages={setStages}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
export default React.memo(LeadsRender);
