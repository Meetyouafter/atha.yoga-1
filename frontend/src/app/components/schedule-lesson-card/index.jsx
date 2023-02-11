import React, { useState } from 'react';
import {
  Box, Divider, Grid, Typography,

  Button,
  Card, Menu, MenuItem, Modal,
} from '@mui/material';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { Link, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import EmojiFlagsOutlinedIcon from '@mui/icons-material/EmojiFlagsOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LessonMenu from './menu';
import ticket from '../../../assets/public/ticket.svg';
import LinkModal from './linkModal';
import DateModal from './dateModal';
import useMediaQuery from '@mui/material/useMediaQuery';

const ScheduleLessonCard = ({
  name, weekday, date, timeInterval, disabled,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLinkModal, setOpenLinkModal] = useState(false);
  const [openDateModal, setOpenDateModal] = useState(false);

  const pointForAdaptiveToSM = useMediaQuery('(max-width:600px)');

  const handleClickOpenLinkModal = () => setOpenLinkModal(true);
  const handleClickOpenDateModal = () => setOpenDateModal(true);
  const handleClickCloseLinkModal = () => setOpenLinkModal(false);
  const handleClickCloseDateModal = () => setOpenDateModal(false);

  const handleClose = () => {
    setOpenLinkModal(false);
  };

  const handleCloseModal = () => setOpenLinkModal(false);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleOpenModal = () => {
    handleMenuClose();
    setOpenLinkModal(true);
  };

  return (
    <Box maxWidth="100%" disabled width="800px" m="16px" sx={{ border: '1px solid #E0E0E0', borderRadius: '8px' }}>
      <Grid container alignItems="center" justifyContent="center">

        <Grid item>
          <Typography sx={{
            textAlign: 'center', p: '32px 16px 33px 20px', fontSize: '18px', color: disabled ? '#ADB5BD' : '#212121', width: '10%',
          }}
          >
            {weekday}
          </Typography>
        </Grid>

        <Divider orientation="vertical" variant="middle" sx={{ width: '2%', borderRight: disabled ? '1px solid #BDBDBD' : '1px solid #0D6EFD' }} flexItem />

        <Grid item xs container sx={{ width: '78%' }}>
          <Grid item xs container direction="column" sx={{ p: pointForAdaptiveToSM ? '0 0 0 16px' : '16px' }}>
            <Grid item>
              <Typography sx={{ fontSize: '18px', mb: '8px', color: disabled ? '#ADB5BD' : '#212121' }}>
                {name}
              </Typography>
            </Grid>
            <Grid item display="flex">
              <Typography mr="16px" sx={{ color: disabled ? '#ADB5BD' : 'text.secondary' }}>
                <DateRangeOutlinedIcon fontSize="20" sx={{ mr: '6px', verticalAlign: '-2px', color: disabled ? '#9E9E9E' : '#0D6EFD' }} />
                {date}
              </Typography>
              <Typography sx={{ color: disabled ? '#ADB5BD' : 'text.secondary' }}>
                <AccessTimeOutlinedIcon fontSize="20" sx={{ mr: '6px', verticalAlign: '-2px', color: disabled ? '#9E9E9E' : '#0D6EFD' }} />
                {timeInterval}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item container alignItems="center" justifyContent="center" sx={{ width: '10%', marginBottom: pointForAdaptiveToSM ? '17%' : '' }}>
          <MoreHorizOutlinedIcon
            color="disabled"
            sx={{ cursor: 'pointer' }}
            id="basic-button"
            aria-controls={openMenu ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}
            onClick={handleMenuClick}
          />
          <LessonMenu
            anchorEl={anchorEl}
            openMenu={openMenu}
            handleClickOpenLinkModal={handleClickOpenLinkModal}
            handleClickOpenDateModal={handleClickOpenDateModal}
            handleMenuClose={handleMenuClose}
          />
          <LinkModal
            isOpenModal={openLinkModal}
            handleClose={handleClickCloseLinkModal}
            name={name}
            date={date}
            timeInterval={timeInterval}
          />
          <DateModal isOpenModal={openDateModal} handleClose={handleClickCloseDateModal} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ScheduleLessonCard;
