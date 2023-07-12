import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Create from '../../pages/Create';
import { useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';

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

export default function NewLeadModal() {
  const [open, setOpen] = React.useState(false);

  const buttonRef = useRef(null);

  const handleOpen = () => {
    setOpen(true);
    buttonRef.current.blur();
  };
  const handleClose = () => {
    setOpen(false);
    // setRerender();
  };

  return (
    <div>
      <Button
        ref={buttonRef}
        onClick={handleOpen}
        variant="contained"
        endIcon={<AddIcon />}
        sx={{ marginRight: '20px' }}>
        New Lead
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <Create onClose={handleClose} stage="leadIn" />
        </Box>
      </Modal>
    </div>
  );
}