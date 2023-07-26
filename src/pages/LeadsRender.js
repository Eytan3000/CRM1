import React, { useContext, useEffect, useRef, useState } from 'react';
import NewLeadModal from '../components/leadsRender/NewLeadModal';
import AddStagePopper from '../components/leadsRender/AddStagePopper';
import { loadCards, loadStagesContext } from '../contexts/DbFunctionsContext';
import LeadRenderColumn from '../components/leadsRender/LeadRenderColumn';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { renderContext, dndDataContext } from '../contexts/DbFunctionsContext';
import { useMediaQuery } from '@mui/material';
import { layoutNameContext } from '../contexts/DbFunctionsContext';
import SettingsIcon from '@mui/icons-material/Settings';
import VerticalMenuPop from '../components/auxs/VerticalMenuPop';

import _ from 'lodash';
import { arrayToMap } from '../helpers/helpers';
import { DragDropContext } from 'react-beautiful-dnd';
import { updateObjectDB } from '../helpers/dbFunctions';

//----------------------------------------------------------
// addUser();
//----------------------------------------------------------
function LeadsRender() {
  // console.log('LeadsRender');

  const loadCardsContentCtx = useContext(loadCards);
  const loadStagesCtx = useContext(loadStagesContext);
  const { reRender, setRerender } = useContext(renderContext);
  const { setLayoutName } = useContext(layoutNameContext);

  const [leads, setLeads] = useState([]);
  const [stages, setStages] = useState([]);
  const [open, setOpen] = React.useState(null);
  const [deleteStageShow, setDeleteStageShow] = useState(false);

  // const [dndData, setDndData] = useState([]);
  const { dndData, setDndData } = useContext(dndDataContext);

  const wrapMaxWidth = (1300 * stages.length) / 5; // when does the window stop squeezing and start pushing
  const isDesktop = useMediaQuery(
    `(min-width: 900px) and (max-width: ${wrapMaxWidth}px)`
  ); // the mediaQuery is affected by the number of stages.

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

  //set dnd
  useEffect(() => {
    const stagesLeadsArr = stages.map((stage) => {
      return {
        ...stage,
        leads: leads.filter((lead) => lead.stage === stage.name),
      };
    });
    setDndData(arrayToMap(stagesLeadsArr));
  }, [stages, leads]);

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

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Check if there is a valid destination and the position has changed
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }
    const draggedLead = _.filter(
      leads,
      (data, key) => data.id === draggableId
    )[0];

    // Retrieve the lead being dragged
    const retrievedStageName = _.filter(stages, (data, key) => {
      if (data.id === destination.droppableId) return data;
    })[0].name;

    draggedLead.stage = retrievedStageName;
    updateObjectDB(draggableId, draggedLead);

    // Update the stage for the dragged lead
    const updatedLeads = leads.map((lead) => {
      if (lead.id === draggableId) {
        return { ...lead, stage: retrievedStageName };
      }
      return lead;
    });

    setLeads(updatedLeads);

    // setStages((prevStages) => {
    //   const updatedStages = [...prevStages];
    //   updatedStages[source.droppableId].leads = updatedLeads.filter(
    //     (lead) => lead.stage === updatedStages[source.droppableId].name
    //   );
    //   updatedStages[destination.droppableId].leads = updatedLeads.filter(
    //     (lead) => lead.stage === updatedStages[destination.droppableId].name
    //   );
    //   return updatedStages;
    // });

    //כרגע בשביל לשנות את הגובה של הלידים בעמודות צריך לשנות את המיקום שלהם בתוך המערך של הלידים בדאטבייס. אחרי שתפתח דאטהבייס תבנה פונקציה שעושה את זה לפי האופציות בדאטהבייס.
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box
        display="flex"
        justifyContent="flex-end"
        paddingBottom={2}
        width="100%">
        <NewLeadModal />
        <AddStagePopper stages={stages} setStages={setStages} />
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
        {_.map(dndData, (data, key) => {
          return (
            <Grid
              id="first-grid-id"
              item
              key={key}
              sm={12}
              md={12 / stages.length}
              minWidth={210}>
              <LeadRenderColumn
                keyVal={data.id}
                stage={data}
                leads={data.leads}
                setDeleteStageShow={setDeleteStageShow}
                deleteStageShow={deleteStageShow}
                setStages={setStages}
              />
            </Grid>
          );
        })}
      </Grid>
    </DragDropContext>
  );
}
export default React.memo(LeadsRender);
