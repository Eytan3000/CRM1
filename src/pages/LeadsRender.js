import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';

import Stack from '@mui/material/Stack';
import TitleLabel from '../components/TitleLabel';
import { convertCamelCaseToSpaces } from '../helpers/helpers';

import LeadCard from '../components/LeadCard';

import NewLeadModal from '../components/NewLeadModal';
import AddStagePopper from '../components/AddStagePopper';
import { loadCards, loadStagesContext } from '../contexts/DbFunctionsContext';

import { deleteLeadFromDb, updateStageToDb } from '../helpers/dbFunctions';

const useStyles = makeStyles((theme) => {
  return {
    background: {
      // background: '#F2F2F2',
      // background: '#e7ebefff',
      // background: '#f0f3f7',
      background: '#f5f7faff',
      // background: '#fafafcff',
      width: '100%',
      padding: theme.spacing(2),
    },
    label: {
      fontWeight: 'bold',
      // marginBottom: '2px',
    },
    customCard: {
      height: '1px',
      background: '#F00B0B',
    },
  };
});

export default function LeadsRender({ idPassUp, stagesPassUp }) {
  const loadCardsContentCtx = useContext(loadCards);
  const loadStagesCtx = useContext(loadStagesContext);

  const classes = useStyles();
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

  const handleDelete = async (id) => {
    await deleteLeadFromDb(id);
  };

  function leadRenderColumn(leads, stage) {
    const leadIns = leads.map((lead) => {
      if (lead.stage === stage)
        return (
          <div key={lead.id}>
            <LeadCard
              keyVal={lead.id}
              lead={lead}
              handleDelete={handleDelete}
              idPassUp={idPassUp}
            />
          </div>
        );
    });
    return leadIns;
  }

  return (
    <div>
      <AddStagePopper updateStage={updateStage} />
      <NewLeadModal setRerender={() => setRerender(!reRender)} />
      <Stack direction="row" spacing={1} justifyContent="flex-start">
        {stages.map((stage) => {
          return (
            <Stack
              key={stage.id}
              className={classes.background}
              spacing={0.5}
              // minWidth={250}
            >
              <TitleLabel
                variant="h6"
                className={classes.label}
                label={convertCamelCaseToSpaces(stage.name)}
              />
              {leadRenderColumn(leads, stage.name)}
            </Stack>
          );
        })}
      </Stack>
    </div>
  );
}
