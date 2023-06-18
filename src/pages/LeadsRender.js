import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import NoteCard from '../components/NoteCard';
import Stack from '@mui/material/Stack';
import TitleLabel from '../components/TitleLabel';

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
  };
});

export default function LeadsRender({ idPassUp }) {
  const classes = useStyles();
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/leads')
      .then((res) => res.json())
      .then((data) => setLeads(data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    await fetch('http://localhost:8000/leads/' + id, {
      method: 'DELETE',
    });
    const newLeads = leads.filter((note) => note.id !== id);
    setLeads(newLeads);
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 3,
  };

  function leadRenderColumn(leads, stage) {
    const leadIns = leads.map((note) => {
      if (note.stage === stage)
        return (
          <div>
            <NoteCard
              note={note}
              handleDelete={handleDelete}
              idPassUp={idPassUp}
            />
          </div>
        );
    });
    return leadIns;
  }

  return (
    <Stack direction="row" spacing={1} justifyContent="flex-start">
      <Stack className={classes.background} spacing={1}>
        <TitleLabel variant="h6" className={classes.label} label="Lead In" />
        {leadRenderColumn(leads, 'leadIn')}
      </Stack>
      <Stack className={classes.background} spacing={1}>
        <TitleLabel variant="h6" className={classes.label} label="No Answer" />
        {leadRenderColumn(leads, 'noAnswer')}
      </Stack>
      <Stack className={classes.background} spacing={1}>
        <TitleLabel variant="h6" className={classes.label} label="Call Back" />
        {leadRenderColumn(leads, 'callBack')}
      </Stack>
    </Stack>
  );
}
