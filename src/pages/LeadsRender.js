import React, { useContext, useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';

import NewLeadModal from '../components/NewLeadModal';
import AddStagePopper from '../components/AddStagePopper';
import { loadCards, loadStagesContext } from '../contexts/DbFunctionsContext';

import { updateStageToDb } from '../helpers/dbFunctions';

import LeadRenderColumn from '../components/leadRender/LeadRenderColumn';

//----------------------------------------------------------

export default function LeadsRender({ idPassUp, stagesPassUp }) {
  const loadCardsContentCtx = useContext(loadCards);
  const loadStagesCtx = useContext(loadStagesContext);

  const [leads, setLeads] = useState([]);
  const [stages, setStages] = useState([]);
  const [reRender, setRerender] = useState(true);

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
      <NewLeadModal setRerender={() => setRerender(!reRender)} />
      <Stack direction="row" spacing={5} justifyContent="flex-start">
        {stages.map((stage) => (
          <LeadRenderColumn stage={stage} leads={leads} idPassUp={idPassUp} />
        ))}
      </Stack>
    </div>
  );
}
