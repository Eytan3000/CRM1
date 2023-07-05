import React, { useContext, useEffect, useState } from 'react';

import NewLeadModal from '../components/NewLeadModal';
import AddStagePopper from '../components/AddStagePopper';
import { loadCards, loadStagesContext } from '../contexts/DbFunctionsContext';

import { updateStageToDb } from '../helpers/dbFunctions';

import LeadRenderColumn from '../components/leadRender/LeadRenderColumn';
import { Grid } from '@mui/material';
import { renderContext } from '../contexts/DbFunctionsContext';
//----------------------------------------------------------

export default function LeadsRender({ idPassUp, stagesPassUp }) {
  const loadCardsContentCtx = useContext(loadCards);
  const loadStagesCtx = useContext(loadStagesContext);

  const [leads, setLeads] = useState([]);
  const [stages, setStages] = useState([]);

  // const [reRender, setRerender] = useState(true);
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
      <AddStagePopper updateStage={updateStage} />
      {/* <NewLeadModal setRerender={() => setRerender(!reRender)} /> */}
      <NewLeadModal />
      {/* <Grid container spacing={3}> */}
      <Grid container rowSpacing={2} columnSpacing={5}>
        {stages.map((stage) => (
          <Grid item key={stage.id} sm={12} md={12 / stages.length}>
            <LeadRenderColumn stage={stage} leads={leads} idPassUp={idPassUp} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
