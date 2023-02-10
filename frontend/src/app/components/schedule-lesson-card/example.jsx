import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card, Divider, Grid, Menu, MenuItem, Modal, Typography,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import EmojiFlagsOutlinedIcon from '@mui/icons-material/EmojiFlagsOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ticket from '../../../assets/public/ticket.svg';

const LessonModal = ({
  title, endDate, id, status,
}) => {
  const prepareEndDate = date => `${date.split('T')[0].split('-').reverse().join('.')} ${date.split('T')[1].slice(0, 5)}`;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const isEnded = () => {
    const today = new Date();
    const endTime = new Date(Date.parse(endDate));
    return !((endTime - today));
  };

  const handleCloseModal = () => setOpenModal(false);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleOpenModal = () => {
    handleMenuClose();
    setOpenModal(true);
  };
  const deleteTicket = () => {
    handleCloseModal();
  };
  const styleModal = {
    position: 'absolute',
    display: 'flex',
    gap: '34px',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 616,
    bgcolor: '#FAFAFA',
    border: 'none',
    boxShadow: '0px 10px 20px rgba(16, 50, 80, 0.12)',
    p: 3,
    '&:focus': {
      outline: 'none',
    },
  };
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" fontWeight="600">
            Удалить занятие
          </Typography>
          <CloseIcon sx={{ width: '24px', height: '24px', color: '#616161' }} onClick={handleCloseModal} />
        </Stack>
        <Typography id="modal-modal-description" fontSize="16px">
          Вы действительно хотите удалить занятие?
        </Typography>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Button variant="text" sx={{ fontSize: '14px' }} onClick={handleCloseModal}>отмена</Button>
          <Button variant="text" sx={{ fontSize: '14px' }} color="error" onClick={deleteTicket}>удалить</Button>
        </Stack>
      </Box>
    </Modal>

  );
};

export default LessonModal;