import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';

import Stack from '@mui/material/Stack';
import TitleLabel from '../components/TitleLabel';
import { convertCamelCaseToSpaces } from '../helpers/helpers';

import LeadCard from '../components/LeadCard';

import NewLeadModal from '../components/NewLeadModal';
import AddStagePopper from '../components/AddStagePopper';
import { loadAllLeadsCards } from '../helpers/dbFunctions';

const useStyles = makeStyles((theme) => {
  return {
    background: {
      background: '#F2F2F2',
      width: '100%',
      padding: theme.spacing(2),
    },
    label: {
      fontWeight: 'bold',
      marginBottom: '4px',
    },
    customCard: {
      height: '1px',
      background: '#F00B0B',
    },
  };
});

export default function LeadsRender({ idPassUp, stagesPassUp }) {
  const classes = useStyles();
  const [leads, setLeads] = useState([]);
  const [stages, setStages] = useState([]);
  const [reRender, setRerender] = useState(true);

  useEffect(() => {
    loadAllLeadsCards()
      .then((data) => setLeads(data))
      .catch((err) => console.log(err));
  }, [reRender]);

  useEffect(() => {
    fetch('http://localhost:8000/stages')
      .then((res) => res.json())
      .then((data) => {
        setStages(data);
        stagesPassUp(data);
      })
      .catch((err) => console.log(err));
  }, []);

  //////////////////////////////////////////////
  const updateStage = (newStage) => {
    fetch('http://localhost:8000/stages', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        name: newStage,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStages((prevStage) => [...prevStage, { ...data }]);
      })

      .catch((err) => console.error(err));
  };
  //////////////////////////////////////////////
  const handleDelete = async (id) => {
    await fetch('http://localhost:8000/leads/' + id, {
      method: 'DELETE',
    });
    const newLeads = leads.filter((lead) => lead.id !== id);
    setLeads(newLeads);
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 3,
  };

  function leadRenderColumn(leads, stage) {
    const leadIns = leads.map((lead) => {
      if (lead.stage === stage)
        return (
          <div>
            <LeadCard
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
            <Stack className={classes.background} spacing={1}>
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
