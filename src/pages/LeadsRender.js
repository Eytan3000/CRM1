import React, { useContext, useEffect, useState } from 'react';

import NewLeadModal from '../components/leadRender/NewLeadModal';
import AddStagePopper from '../components/leadRender/AddStagePopper';
import { loadCards, loadStagesContext } from '../contexts/DbFunctionsContext';

import { updateStageToDb } from '../helpers/dbFunctions';

import LeadRenderColumn from '../components/leadRender/LeadRenderColumn';
import { Box, Grid } from '@mui/material';
import { renderContext } from '../contexts/DbFunctionsContext';
import { useMediaQuery } from '@mui/material';

//----------------------------------------------------------

export default function LeadsRender({ idPassUp, stagesPassUp }) {
  const loadCardsContentCtx = useContext(loadCards);
  const loadStagesCtx = useContext(loadStagesContext);

  const [leads, setLeads] = useState([]);
  const [stages, setStages] = useState([]);
  const wrapMaxWidth = (1300 * stages.length) / 5; // when does the window stop squeezing and start pushing
  const isDesktop = useMediaQuery(
    `(min-width: 900px) and (max-width: ${wrapMaxWidth}px)`
  ); // the mediaQuery is affected by the number of stages.

  const { reRender, setRerender } = useContext(renderContext);

  useEffect(() => {
    (async () => {
      const arr = await loadCardsContentCtx();
      setLeads(arr);
    })();
  }, [reRender]);

  //load Stages
  useEffect(() => {
    (async () => {
      const arr = await loadStagesCtx();
      setStages(arr);
      stagesPassUp(arr);
    })();
  }, []);

  const updateStage = (newStage) => {
    updateStageToDb(newStage)
      .then((data) => {
        setStages((prevStage) => [...prevStage, { ...data }]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Box display="flex" paddingBottom={2}>
        <NewLeadModal />
        {/* <Grid container spacing={3}> */}
        <AddStagePopper updateStage={updateStage} />
      </Box>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={5}
        sx={{ flexWrap: isDesktop ? 'nowrap' : 'wrap' }}>
        {stages.map((stage) => (
          <Grid
            item
            key={stage.id}
            sm={12}
            md={12 / stages.length}
            minWidth={210}>
            <LeadRenderColumn stage={stage} leads={leads} idPassUp={idPassUp} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
