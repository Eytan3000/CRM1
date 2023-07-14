import { MenuItem, Popover, Typography } from '@material-ui/core';
import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

export default function VerticalIconPop({
  edit,
  open,
  handleCloseMenu,
  handleClickDelete,
  handleClickEdit,
}) {
  return (
    <Popover
      open={Boolean(open)}
      anchorEl={open}
      onClose={handleCloseMenu}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          p: 1,
          width: 140,
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
          },
        },
      }}>
      {edit && (
        <MenuItem onClick={handleClickEdit}>
          <EditIcon sx={{ mr: 1.2, fontSize: '1.15em' }} />
          <Typography variant="subtitle1">Edit</Typography>
        </MenuItem>
      )}
      <MenuItem onClick={handleClickDelete}>
        <DeleteOutlineIcon sx={{ mr: 1 }} fontSize="small" color="error" />
        <Typography variant="subtitle1" color="error">
          Delete
        </Typography>
      </MenuItem>
    </Popover>
  );
}
