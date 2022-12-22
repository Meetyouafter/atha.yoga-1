/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from '@mui/material';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const DialogWindow = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  backdropFilter: 'blur(5px)',
}));

const CustomDialogTitle = props => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, width: '600px' }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

CustomDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const AlertDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <DialogWindow
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <CustomDialogTitle id="customized-dialog-title" onClose={() => setOpen(false)}>
          <Typography variant="modal_title">Данные не были сохранены</Typography>
        </CustomDialogTitle>
        <DialogContent>
          <Typography variant="modal">
            Сохранить как черновик?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Не сохранять
          </Button>
          <Button autoFocus onClick={() => setOpen(false)}>
            Сохранить
          </Button>
        </DialogActions>
      </DialogWindow>
    </div>
  );
};

export default AlertDialog;
