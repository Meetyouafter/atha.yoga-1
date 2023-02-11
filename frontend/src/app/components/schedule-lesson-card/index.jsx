import React, { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Box, Divider, Grid, Typography,
} from '@mui/material';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import LessonMenu from './lessonMenu';
import LinkModal from './linkModal';
import DateModal from './dateModal';

const ScheduleLessonCard = ({
  name, weekday, date, timeInterval, disabled,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLinkModal, setOpenLinkModal] = useState(false);
  const [openDateModal, setOpenDateModal] = useState(false);

  const pointForAdaptiveToSM = useMediaQuery('(max-width:600px)');
  const openMenu = Boolean(anchorEl);

  const handleClickOpenLinkModal = () => setOpenLinkModal(true);
  const handleClickOpenDateModal = () => setOpenDateModal(true);
  const handleClickCloseLinkModal = () => setOpenLinkModal(false);
  const handleClickCloseDateModal = () => setOpenDateModal(false);

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
            onClick={handleMenuOpen}
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
            handleMenuClose={handleMenuClose}
            name={name}
            date={date}
            timeInterval={timeInterval}
          />
          <DateModal
            isOpenModal={openDateModal}
            handleClose={handleClickCloseDateModal}
            handleMenuClose={handleMenuClose}
            name={name}
            date={date}
            timeInterval={timeInterval}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ScheduleLessonCard;
