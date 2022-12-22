/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import 'dayjs/locale/ru';
import {
  Grid,
  Container,
  Typography,
  Switch,
  TextField,
  MenuItem,
  Select,
  Radio,
  Button,
  InputLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Checkbox,
  OutlinedInput,
  ListItemText,
  Box,
  Divider,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import dayjs from 'dayjs';

const LessonCreate = () => {
  const [lessonLevel, setLessonLevel] = useState([]);
  const [startLessonDate, setStartLessonDate] = useState(null);
  const [finishLessonDate, setFinishLessonDate] = useState(null);
  const [lessonDay, setLessonDay] = useState('');
  const [lessonTime, setLessonTime] = useState(null);
  const [regularLessons, setRegularLessons] = useState([]);

  const [lessonData, setLessonData] = useState({
    name: '',
    description: '',
    type: 'online',
    link: '',
    conferenceId: '',
    level: [],
    duration: '',
    repeat: 'once',
    date: null,
    time: null,
    regularLessons: [],
    payment: 'paid',
    donation: true,
    cost: '',
  });

  const update = e => {
    setLessonData({
      ...lessonData,
      [e.target.name]: e.target.value,
    });
  };

  const changeDonation = e => {
    const value = !(e.target.value === 'on');
    setLessonData({
      ...lessonData,
      [e.target.name]: value,
    });
  };

  const changeLessonLevel = event => {
    const {
      target: { value },
    } = event;
    setLessonLevel(
      typeof value === 'string' ? value.split(',') : value,
      update(event),
    );
  };

  const lessonLevels = ['Начинающий', 'Средний', 'Продвинутый'];

  const setDate = newValue => {
    setLessonData({
      ...lessonData,
      date: newValue.$d,
    });
  };

  const setTime = newValue => {
    setLessonData({
      ...lessonData,
      time: newValue.$d,
    });
  };

  const lessonsInfo = () => {
    const time = dayjs(lessonTime).minute() > 9 ? `${dayjs(lessonTime).hour()}:${dayjs(lessonTime).minute()}` : `${dayjs(lessonTime).hour()}:0${dayjs(lessonTime).minute()}`;
    const copyRegularLesson = Object.assign([], regularLessons);
    copyRegularLesson.push([lessonDay, time]);
    setRegularLessons(copyRegularLesson);
    setLessonDay('');
    setLessonTime(null);
  };

  const addLessonButtonDisabled = () => {
    let result = '';
    if (lessonDay.length === 0) {
      result = true;
    } else if (lessonTime === null) {
      result = true;
    } else {
      result = false;
    }
    return result;
  };

  const deleteLesson = lesson => {
    setRegularLessons(regularLessons.filter(p => p !== lesson));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <Grid
        container
        sx={{
          justifyContent: 'space-between', padding: '20px 24px', marginBottom: '20px', boxShadow: '0px -5px 20px 0px #2e3c50',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ArrowBackIcon sx={{
            color: '#616161', width: '24px', height: '24px', cursor: 'pointer', marginRight: '14px',
          }}
          />
          <Typography variant="modal" sx={{ fontWeigth: 500, fontSize: '24px', color: '#616161' }}>Создание занятия</Typography>
        </Box>
        <SettingsIcon sx={{
          color: '#BDBDBD', width: '24px', height: '24px', cursor: 'pointer',
        }}
        />
      </Grid>
      <form onSubmit={e => {
        e.preventDefault();
        console.log(lessonData);
        console.log(regularLessons);
      }}
      >
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid
            container
            direction="column"
            rowSpacing={3}
            sx={{ width: '70%', padding: '16px' }}
          >

            <Grid item>
              <Typography variant="modal">Обязательные поля *</Typography>
            </Grid>

            <Grid item>
              <TextField
                id="lesson_name"
                label="Название занятия"
                name="name"
                onChange={update}
                value={lessonData.name}
                required
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                id="lesson_description"
                label="Описание"
                name="description"
                placeholder="Первые N символов будут показаны в карточке занятия при поиске"
                onChange={update}
                value={lessonData.description}
                multiline
                fullWidth
                rows={4}
              />
            </Grid>

            <Grid item sx={{ height: '6%' }}>
              <FormControl fullWidth sx={{ paddingLeft: '2%' }}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue="online"
                  sx={{ columnGap: '5%' }}

                >
                  <FormControlLabel
                    onChange={update}
                    value="online"
                    name="type"
                    control={<Radio />}
                    label={<Typography variant="modal" sx={{ fontSize: '16px', color: '#212121' }}>Онлайн</Typography>}
                  />
                  <FormControlLabel
                    onChange={update}
                    name="type"
                    value="video"
                    control={<Radio />}
                    label={<Typography variant="modal" sx={{ fontSize: '16px', color: '#212121' }}>Видео</Typography>}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item container sx={{ justifyContent: 'space-between' }}>
              <TextField
                id="lesson_link"
                label="Ссылка на занятие"
                name="link"
                value={lessonData.link}
                onChange={update}
                sx={{ width: '48%' }}
                required
              />

              <TextField
                id="lesson_link"
                label="Данные для доступа"
                name="conferenceId"
                value={lessonData.conferenceId}
                onChange={update}
                placeholder="Идентификатор конференции"
                sx={{ width: '48%' }}
              />
            </Grid>

            <Grid item>
              <FormControl fullWidth>
                <InputLabel id="lesson-level-label">Уровень подготовки</InputLabel>
                <Select
                  labelId="lesson-level-label"
                  id="lesson-level-checkbox"
                  multiple
                  required
                  fullWidth
                  name="level"
                  value={lessonLevel}
                  onChange={changeLessonLevel}
                  input={<OutlinedInput label="Уровень подготовки" />}
                  renderValue={selected => selected.join(', ')}
                >
                  {lessonLevels.map(level => (
                    <MenuItem key={level} value={level}>
                      <Checkbox checked={lessonLevel.indexOf(level) > -1} />
                      <ListItemText primary={level} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <TextField
                id="lesson_duration"
                label="Длительность занятия, мин"
                name="duration"
                type="number"
                onChange={update}
                required
                value={lessonData.duration}
                sx={{ width: '49%' }}
              />
            </Grid>

            <Grid item>
              <Divider variant="middle" sx={{ paddingTop: '20px' }} />
            </Grid>

            <Grid item sx={{ height: '6%' }}>
              <FormControl fullWidth sx={{ paddingLeft: '2%' }}>
                <RadioGroup
                  row
                  aria-labelledby="lesson-repeat-label"
                  name="lesson-repeat-radio-buttons-group"
                  defaultValue="once"
                  sx={{ columnGap: '5%' }}
                >
                  <FormControlLabel
                    onChange={update}
                    value="once"
                    name="repeat"
                    control={<Radio />}
                    label={<Typography variant="modal" sx={{ fontSize: '16px', color: '#212121' }}>Разовое</Typography>}
                  />
                  <FormControlLabel
                    onChange={update}
                    name="repeat"
                    value="regular"
                    control={<Radio />}
                    label={<Typography variant="modal" sx={{ fontSize: '16px', color: '#212121' }}>Регулярное</Typography>}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {lessonData.repeat === 'once'
              ? (
                <Grid item container sx={{ justifyContent: 'start', columnGap: '4%' }}>
                  <DatePicker
                    label="Дата*"
                    value={lessonData.date}
                    id="lesson_date"
                    minDate={dayjs(Date())}
                    required
                    onChange={newValue => setDate(newValue)}
                    renderInput={params => <TextField {...params} sx={{ width: '35%' }} />}
                  />
                  <TimePicker
                    label="Время*"
                    value={lessonData.time}
                    id="lesson_time"
                    required
                    onChange={newValue => setTime(newValue)}
                    renderInput={params => <TextField {...params} sx={{ width: '35%' }} />}
                  />
                </Grid>
              )
              : (
                <>
                  <Grid item container sx={{ justifyContent: 'start', columnGap: '4%' }}>
                    <Typography variant="modal" sx={{ fontSize: '18px', color: '#212121', paddingBottom: '20px' }}>
                      Определите продолжительность серии занятий (не более 2-х месяцев)
                    </Typography>

                    <DatePicker
                      label="Начало*"
                      value={startLessonDate}
                      required
                      minDate={dayjs(Date())}
                      onChange={newValue => setStartLessonDate(newValue)}
                      renderInput={params => <TextField {...params} sx={{ width: '35%' }} />}
                    />
                    <DatePicker
                      label="Окончание*"
                      value={finishLessonDate}
                      disabled={startLessonDate === null}
                      minDate={startLessonDate}
                      maxDate={dayjs(startLessonDate).add(2, 'month')}
                      onChange={newValue => setFinishLessonDate(newValue)}
                      renderInput={params => <TextField {...params} sx={{ width: '35%' }} />}
                    />

                    <Typography
                      variant="modal"
                      sx={{
                        fontSize: '18px', color: '#212121', paddingTop: '30px', paddingBottom: '20px',
                      }}
                    >
                      Задайте регулярное расписание занятий на неделю
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    container
                    sx={{
                      border: '1px solid #E5E5E5',
                      padding: '10px',
                      minHeight: '150px',
                      alignContent: 'flex-start',
                      justifyContent: 'space-around',
                      borderRadius: '10px',
                    }}
                  >
                    <FormControl sx={{ width: '30%' }}>
                      <InputLabel id="demo-simple-select-label">День недели</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={lessonDay}
                        name="dayForRegularLesson"
                        label="День недели"
                        onChange={e => setLessonDay(e.target.value)}
                      >
                        <MenuItem value="Понедельник">Понедельник</MenuItem>
                        <MenuItem value="Вторник">Вторник</MenuItem>
                        <MenuItem value="Среда">Среда</MenuItem>
                        <MenuItem value="Четверг">Четверг</MenuItem>
                        <MenuItem value="Пятница">Пятница</MenuItem>
                        <MenuItem value="Суббота">Суббота</MenuItem>
                        <MenuItem value="Воскресенье">Воскресенье</MenuItem>
                      </Select>
                    </FormControl>

                    <TimePicker
                      label="Время"
                      value={lessonTime}
                      id="regular_lesson_time"
                      required
                      sx={{ width: '30%' }}
                      onChange={newValue => setLessonTime(newValue)}
                      renderInput={params => <TextField {...params} required />}
                    />

                    <Button
                      variant="text"
                      disabled={addLessonButtonDisabled()}
                      onClick={lessonsInfo}
                    >
                      Добавить занятие
                    </Button>
                    {regularLessons.map(lesson => (
                      <Box
                        key={Math.random()}
                        sx={{
                          width: '100%', display: 'flex', columnGap: '10%', paddingTop: '5%', paddingLeft: '5%',
                        }}
                      >
                        <Box sx={{
                          width: '40%', display: 'flex', columnGap: '10%', borderBottom: '1px solid #E5E5E5', justifyContent: 'space-between', paddingBottom: '1%',
                        }}
                        >
                          <Box sx={{ width: '10%', display: 'flex', justifyContent: 'space-around' }}>
                            <DateRangeOutlinedIcon sx={{ color: '#0D6EFD', marginRight: '5px' }} />
                            <Typography variant="modal" sx={{ fontSize: '16px' }}>{lesson[0]}</Typography>
                            <AccessTimeIcon sx={{ color: '#0D6EFD', marginLeft: '15px', marginRight: '5px' }} />
                            <Typography variant="modal" sx={{ fontSize: '16px' }}>{lesson[1]}</Typography>
                          </Box>
                          <CloseOutlinedIcon
                            sx={{ color: '#616161', cursor: 'pointer' }}
                            onClick={() => { deleteLesson(lesson); }}
                          />
                        </Box>
                      </Box>
                    ))}
                  </Grid>
                </>
              )}

            <Grid item>
              <Divider variant="middle" sx={{ paddingTop: '20px' }} />
            </Grid>

            <Grid item sx={{ height: '6%' }}>
              <FormControl fullWidth sx={{ paddingLeft: '2%' }}>
                <RadioGroup
                  row
                  aria-labelledby="lesson-cost-label"
                  name="lesson-cost-radio-buttons-group"
                  defaultValue="paid"
                  sx={{ columnGap: '5%' }}
                >
                  <FormControlLabel
                    onChange={update}
                    value="paid"
                    name="payment"
                    control={<Radio />}
                    label={<Typography variant="modal" sx={{ fontSize: '16px', color: '#212121' }}>Платно</Typography>}
                  />
                  <FormControlLabel
                    onChange={update}
                    name="payment"
                    value="free"
                    control={<Radio />}
                    label={<Typography variant="modal" sx={{ fontSize: '16px', color: '#212121' }}>Бесплатно</Typography>}
                    sx={{ marginRight: '1%' }}
                  />
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <FormControlLabel
                    label={<Typography variant="modal" sx={{ fontSize: '16px', color: '#212121' }}>Принимать чаевые</Typography>}
                    sx={{ marginLeft: '2%' }}
                    control={(
                      <Switch
                        defaultChecked
                        onChange={changeDonation}
                        name="donation"
                      />
                )}
                  />
                </RadioGroup>
              </FormControl>

            </Grid>

            <Grid item>
              <TextField
                id="lesson_cost"
                label="Стоимость, руб"
                name="cost"
                type="number"
                onChange={update}
                required={lessonData.payment !== 'free'}
                disabled={lessonData.payment === 'free'}
                value={lessonData.cost}
                sx={{ width: '35%' }}
              />
            </Grid>

            <Grid item container sx={{ justifyContent: 'end', columnGap: '5%' }}>
              <Button
                variant="text"
              >
                Сохранить черновик
              </Button>

              <Button
                variant="contained"
                type="submit"
              >
                Создать
              </Button>
            </Grid>

          </Grid>
        </Container>
      </form>
    </LocalizationProvider>
  );
};

export default LessonCreate;
