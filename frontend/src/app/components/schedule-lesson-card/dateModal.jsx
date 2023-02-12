/* eslint-disable react/prop-types */
/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import {
  Button, Dialog, Grid, Typography, TextField, DialogActions, DialogContent,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import 'dayjs/locale/ru';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { setAlertProps } from '../../core/slices/alert-notification';
import updateLessonsDateSlice from '../../core/slices/schedule/updateLessonDate';

const DateModal = ({
  isOpenModal, handleClose, name, index, date, timeInterval, handleMenuClose,
}) => {
  const [newLessonDate, setNewLessonDate] = useState(null);
  const [newLessonTime, setNewLessonTime] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const pointForAdaptiveToSM = useMediaQuery('(max-width:600px)');

  const dispatch = useDispatch();

  const getValidationFormErrorMessages = () => {
    let dateError;
    let timeError;
    if (newLessonDate !== null && String(newLessonDate.$d) === 'Invalid Date') {
      dateError = 'Неверный формат даты';
    } else if (newLessonDate === null) {
      dateError = 'Обязательное поле';
    } else if (newLessonDate < Date.now()) {
      dateError = 'Дата должна быть не ранее сегодняшней';
    } else {
      dateError = '';
    }
    if (newLessonTime !== null && String(newLessonTime.$d) === 'Invalid Date') {
      timeError = 'Неверный формат времени';
    } else if (newLessonTime === null) {
      timeError = 'Обязательное поле';
    } else {
      timeError = '';
    }

    setValidationErrors({
      ...validationErrors,
      dateError,
      timeError,
    });
  };

  const getUniteDate = () => {
    const lessonDate = newLessonDate;
    const lessonTime = newLessonTime;
    const hour = dayjs(lessonTime).get('hour');
    const minute = dayjs(lessonTime).get('minute');
    const dateValue = dayjs(lessonDate).set('hour', hour).set('minute', minute);
    return dateValue.format();
  };

  const postNewDate = () => {
    const lessonDateForPost = getUniteDate();
    dispatch(updateLessonsDateSlice({ index, date: lessonDateForPost }))
      .then(handleClose())
      .then(handleMenuClose())
      .then(dispatch(setAlertProps({ display: true, status: 'success', title: 'Занятие перенесено' })));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <div>
        <Dialog
          open={isOpenModal}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form onSubmit={e => {
            e.preventDefault();
            postNewDate();
          }}
          >
            <DialogContent sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>

              <Grid container>
                <Grid container item sx={{ alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: '20px' }}>
                  <Typography id="alert-dialog-title" sx={{ fontSize: '18px', color: '#212529', paddingBottom: '18px' }}>
                    Перенести занятие
                  </Typography>
                  <CloseIcon
                    sx={{
                      width: '14px', height: '14px', color: '#6C757D', cursor: 'pointer',
                    }}
                    onClick={handleClose}
                  />

                  <Grid item sx={{ display: 'flex' }}>
                    <InfoOutlinedIcon
                      fontSize="20"
                      sx={{
                        marginTop: '3px', marginRight: '6px', verticalAlign: '-2px', color: '#616161',
                      }}
                    />

                    <Typography sx={{ fontSize: '14px', width: pointForAdaptiveToSM ? '85%' : '100%' }}>
                      Перенос и отмена занятия менее чем за 24 часа уменьшает рейтинг.
                      Пожалуйста, делайте перенос и отмену только в случае необходимости.
                    </Typography>
                  </Grid>
                </Grid>

                <Typography sx={{ fontSize: '16px', color: '#212529' }}>
                  {name}
                </Typography>

                <Grid container item sx={{ paddingBottom: '16px', paddingTop: '5px' }}>
                  <Typography mr="16px" sx={{ color: 'text.secondary' }}>
                    <DateRangeOutlinedIcon fontSize="20" sx={{ mr: '6px', verticalAlign: '-2px', color: '#0D6EFD' }} />
                    {date}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    <AccessTimeOutlinedIcon fontSize="20" sx={{ mr: '6px', verticalAlign: '-2px', color: '#0D6EFD' }} />
                    {timeInterval}
                  </Typography>
                </Grid>

                <Grid container item sx={{ justifyContent: 'space-between', flexDirection: pointForAdaptiveToSM ? 'column' : 'row', columnGap: '4%' }}>
                  <DatePicker
                    label="Дата"
                    value={newLessonDate}
                    onChange={newValue => setNewLessonDate(newValue)}
                    renderInput={params => <TextField {...params} sx={{ width: pointForAdaptiveToSM ? '100%' : '48%', marginBottom: pointForAdaptiveToSM ? '10px' : '0px' }} required error={!!validationErrors.dateError} helperText={validationErrors.dateError} />}
                  />
                  <TimePicker
                    label="Время"
                    value={newLessonTime}
                    onChange={newValue => setNewLessonTime(newValue)}
                    renderInput={params => <TextField sx={{ marginBottom: pointForAdaptiveToSM ? '5%' : '', width: pointForAdaptiveToSM ? '100%' : '48%' }} {...params} required error={!!validationErrors.timeError} helperText={validationErrors.timeError} />}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions
              sx={{ justifyContent: pointForAdaptiveToSM ? 'space-around' : 'right' }}
            >
              <Button onClick={handleClose} sx={{ fontSize: pointForAdaptiveToSM ? '16px' : '14px' }}>Отмена</Button>
              <Button onClick={getValidationFormErrorMessages} type="submit" sx={{ fontSize: pointForAdaptiveToSM ? '16px' : '14px' }}>
                Перенести
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </LocalizationProvider>
  );
};

export default DateModal;
