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
import {
  child,
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
} from 'firebase/database';
import { collection, deleteDoc, getFirestore } from 'firebase/firestore';

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

function initializeBoard(userId, userName, email, boards) {
  const db = getDatabase(app);
  const reference = ref(db, 'users/' + userId);

  set(reference, {
    userName: userName,
    email: email,
    boards: boards,
  });
}
async function initialize2(userId, userName, email, boards) {
  const db = getDatabase(app);
  const reference = ref(db, 'users/' + userId);

  set(reference, {
    userName: userName,
    email: email,
  });

  const boardKey = await addBoard(userId, 'Main Board');
  addStage(userId, boardKey, 'LeadIn');
}

function addLead(userId, lead, pipeline, stage) {
  const db = getDatabase();

  // Get a key for a new Post.
  const key = push(child(ref(db), 'posts')).key;
  lead = { ...lead, id: key };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates[
    `/users/${userId}/boards/${pipeline}/stages/${stage}/leads/` + lead.name
  ] = lead;
  // updates['/user-posts/' + uid + '/' + newLeadKey] = lead;

  return update(ref(db), updates);
}

function addNote(userId, noteContent, pipeline, stage, lead) {
  const db = getDatabase();

  // Get a key for a new Post.
  const key = push(child(ref(db), 'notes')).key;
  const note = {
    note: noteContent,
    id: key,
  };
  const updates = {};

  updates[
    `/users/${userId}/boards/${pipeline}/stages/${stage}/leads/${lead}/notes/` +
      key
  ] = note;

  return update(ref(db), updates);
}
function addStage(userId, pipeline, stage) {
  const db = getDatabase();

  // Get a key.
  const key = push(child(ref(db), 'stage')).key;
  // const key = stage.id;

  // stage = { ...stage, id: key };

  const updates = {};

  updates[`/users/${userId}/boards/${pipeline}/stages/` + key] = stage;

  return update(ref(db), updates);
}

function addBoard(userId, boardName) {
  const db = getDatabase();

  // Get a key.
  const key = push(child(ref(db), 'board')).key;

  const updates = {};

  updates[`/users/${userId}/boards/` + key] = boardName;

  return update(ref(db), updates).then(() => key);
}

function getLead(userId, pipeline, stage, leadKey) {
  const db = getDatabase();
  const valueRef = ref(
    db,
    'users/' + userId + `/boards/${pipeline}/stages/${stage}/leads/${leadKey}/`
  );
  onValue(valueRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    // return data;
  });
}
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
    // initializeBoard(
    //   // userId, userName, email, boards
    //   'Eytan_krief_ID',
    //   'Eytan3000',
    //   'Eytankrief@gmail.com',
    //   {
    //     mainPipeline: {
    //       name: 'Main Pipeline',
    //       stages: {
    //         leadIn: { name: 'Lead In' },
    //         noAnswer: { name: 'No Answer' },
    //         callBack: { name: 'Call Back' },
    //       },
    //     },
    //   }
    // );
    // initialize2(
    //   // userId, userName, email, boards
    //   'Eytan_krief_ID',
    //   'Eytan3000',
    //   'Eytankrief@gmail.com3',
    //   {
    //     mainPipeline: {
    //       name: 'Main Pipeline',
    //       stages: {
    //         leadIn: { name: 'Lead In' },
    //         noAnswer: { name: 'No Answer' },
    //         callBack: { name: 'Call Back' },
    //       },
    //     },
    //   }
    // );
    /////
    // addLead(
    //   //userId, lead, pipeline, stage
    //   'Eytan_krief_ID',
    //   {
    //     name: 'newLead3',
    //     email: 'email3',
    //   },
    //   'mainPipeline',
    //   'leadIn'
    // );
    // addNote(
    //   //userId, noteContent, pipeline,stage, lead
    //   'Eytan_krief_ID',
    //   'lorem epsum5',
    //   'mainPipeline',
    //   'leadIn',
    //   'newLead2'
    // );
    // addStage(
    //   //userId, pipeline, stage
    //   'Eytan_krief_ID',
    //   'mainPipeline',
    //   {
    //     id: 'callInOneMonth',
    //     name: 'Call In a Month',
    //   }
    // );
    // addStage(
    //   //userId, pipeline, stage
    //   'Eytan_krief_ID',
    //   'mainPipeline',
    //   {
    //     id: 'new',
    //     name: 'New',
    //   }
    // );
    // getData('Eytan_krief_ID');
    // getLead(
    //   //userId, pipeline, stage, leadKey
    //   'Eytan_krief_ID',
    //   'mainPipeline',
    //   'leadIn',
    //   'newLead2'
    // );
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
