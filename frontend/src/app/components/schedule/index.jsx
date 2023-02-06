/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Header from '../header';
import ScheduleLessonCard from '../schedule-lesson-card';
import { useState } from 'react';
import getDataForSchedule from './helper';
import getShedule from '../../services/shedule';
import {getShedule2, getShedule3, getShedule4} from '../../services/shedule';
import LessonsService from '../../services/lessons';

const ScheduleLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getShedule()
      .then(response => {
        const data = response.data.data;
        const filteredData = data.sort((a,b) => new Date(a.start_at) - new Date(b.start_at))
        setLessons(filteredData)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));

      getShedule2().then(response => console.log('getShedule2', response))
      getShedule3().then(response => console.log('getShedule3', response))
      getShedule4().then(response => console.log('getShedule4', response))
  }, []);

  const lessonsData = lessons.map((lesson) => {
    const dataForLesson = getDataForSchedule(lesson);
    return (
      <ScheduleLessonCard
        name={dataForLesson.name}
        weekday={dataForLesson.weekday}
        date={dataForLesson.date}
        timeInterval={dataForLesson.timeInterval}
        key={lesson.id}
      />
    );
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Header title='Календарь' />
      {lessonsData}
    </Box>
  );
};

export default ScheduleLessons;
