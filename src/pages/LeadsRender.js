import React, { useContext, useEffect, useState } from 'react';
import NewLeadModal from '../components/leadsRender/NewLeadModal';
import AddStagePopper from '../components/leadsRender/AddStagePopper';
import { loadCards, loadStagesContext } from '../contexts/DbFunctionsContext';
import LeadRenderColumn from '../components/leadsRender/LeadRenderColumn';
import { Box, Grid } from '@mui/material';
import { renderContext } from '../contexts/DbFunctionsContext';
import { useMediaQuery } from '@mui/material';
import { layoutNameContext } from '../contexts/DbFunctionsContext';
//----------------------------------------------------------
//----------------------------------------------------------
function LeadsRender({ idPassUp, stagesPassUp }) {
  const loadCardsContentCtx = useContext(loadCards);
  const loadStagesCtx = useContext(loadStagesContext);
  const { reRender } = useContext(renderContext);
  const { setLayoutName } = useContext(layoutNameContext);

  const [leads, setLeads] = useState([]);
  const [stages, setStages] = useState([]);

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
      stagesPassUp(arr);
    })();
  }, []);

  return (
    <div>
      <Box display="flex" paddingBottom={2}>
        <NewLeadModal />
        <AddStagePopper setStages={setStages} />
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
// export default LeadsRender;
export default React.memo(LeadsRender);
