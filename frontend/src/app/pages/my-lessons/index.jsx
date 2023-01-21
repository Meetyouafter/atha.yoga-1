import React from 'react';
import {
  Box, Typography, Button, Grid, Stack, Badge,
} from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Link } from 'react-router-dom';
import profileCalendar from '../../../assets/public/profile_calendar.png';
import MyLesson from '../../components/my_lesson';

const MyLessonsPage = () => (
  <Grid
    container
    flexDirection="column"
    sx={{ height: '100%' }}
  >
    <Grid
      item
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        width: '100%', height: '64px', px: '29px', boxShadow: '0px 8px 16px rgba(46, 60, 80, 0.1)',
      }}
    >
      <Typography fontSize="20px" fontWeight="500" color="text.secondary">
        Мои занятия
      </Typography>
      <Stack alignItems="center" direction="row" spacing={2}>
        <Badge color="error" variant="dot">
          <NotificationsNoneIcon fontSize="medium" color="disabled" />
        </Badge>
        <Link to="/settings">
          <SettingsOutlinedIcon color="disabled" sx={{ transform: 'translateY(3px)' }} />
        </Link>
      </Stack>
    </Grid>
    <Grid
      item
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        flex: '1 0 auto',
      }}
    >
      <Box mb="80px">
        <img src={profileCalendar} alt="yoga-calendar" />
      </Box>
      <Typography textAlign="center" fontSize="18px" color="text.secondary">
        Список занятий пока пуст
      </Typography>
      <Typography textAlign="center" fontSize="18px" color="text.secondary" mb="24px">
        Запишитесь на свое первое занятие
      </Typography>
      <Button
        component={Link}
        to="/search-lessons"
        sx={{
          minWidth: 382, borderRadius: '6px', fontSize: '16px', lineHeight: '26px',
        }}
        variant="contained"
        size="large"
      >
        Найти занятие
      </Button>
    </Grid>
    <Button
      component={Link}
      to="/create-lesson"
      sx={{
        width: 'max-content', borderRadius: '6px', fontSize: '16px', lineHeight: '26px',
      }}
      variant="outlined"
      size="large"
    >
      Создать занятие
    </Button>
  </Grid>
);

export default MyLessonsPage;
