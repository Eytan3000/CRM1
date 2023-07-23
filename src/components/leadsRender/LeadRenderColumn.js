import React, { useContext, useRef, useState } from 'react';

import { deleteLeadFromDb, deleteStageFromDb } from '../../helpers/dbFunctions';
import { Box, Button, Grid, Modal, Stack } from '@mui/material';
import TitleLabel from '../auxs/TitleLabel';
import { makeStyles } from '@material-ui/core';
import { convertCamelCaseToSpaces } from '../../helpers/helpers';
import Create from '../../pages/Create';
import LeadPaper from './LeadPaper';
import { renderContext } from '../../contexts/DbFunctionsContext';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import DroppableDraggable from './DroppableDraggable';

//----------------------------------------------------

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
    buttonShow: {
      opacity: 1,
    },
    buttonHide: {
      transition: 'opacity 0.3s ease-in-out',
      opacity: 0,
    },
    item: {
      margin: '5px',
    },
  };
});

const handleDelete = (id) => {
  deleteLeadFromDb(id);
};

function addLeadsPapersInColumn(leads, stageName) {
  const leadIns = leads.map((lead) => {
    if (lead.stage === stageName)
      return (
        <div key={lead.id}>
          <LeadPaper keyVal={lead.id} lead={lead} handleDelete={handleDelete} />
        </div>
      );
  });
  return leadIns;
}

//----------------------------------------------------

function LeadRenderColumn({ stage, leads, deleteStageShow, keyVal }) {
  const { setRerender } = useContext(renderContext);

  const [hover, setHover] = useState(false);
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  async function handleDeleteStage(stageKey) {
    await deleteStageFromDb(stageKey);
    setRerender((prev) => !prev);
  }

  return (
    <div>
      {/* Create lead modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Create stage={stage.name} onClose={handleClose} />
        </Box>
      </Modal>

      <Stack
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        key={stage.id}
        className={classes.background}
        spacing={0.5}>
        {/* Delete Button */}
        {deleteStageShow && (
          <Button
            variant="text"
            color="error"
            onClick={() => handleDeleteStage(stage.id)}>
            Delete stage
          </Button>
        )}
        <TitleLabel
          variant="h6"
          className={classes.label}
          label={convertCamelCaseToSpaces(stage.name)}
        />
        {/* {addLeadsPapersInColumn(leads, stage.name)} */}

        <DroppableDraggable
          stage={stage}
          leads={leads}
          handleDelete={handleDelete}
        />

        <Button
          className={hover ? classes.buttonShow : classes.buttonHide}
          color="primary"
          size="large"
          variant="text"
          onClick={handleClick}>
          +
        </Button>
      </Stack>
    </div>
  );
}
export default React.memo(LeadRenderColumn);
