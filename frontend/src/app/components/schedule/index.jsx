import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Header from '../header';
import ScheduleLessonCard from '../schedule-lesson-card';
import LayoutContainer from '../layout-container';
import getDataForSchedule from './helper';
import ScheduleService from '../../services/shedule';

const ScheduleLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    ScheduleService.postLessons()
      .then(response => setLessons(response.data.data))
      .catch(err => setError(err.message));
  }, []);

  const lessonsData = lessons.map(lesson => {
    const dataForLesson = getDataForSchedule(lesson);

    return error ? <div>{error}</div> : (
      <ScheduleLessonCard
        name={dataForLesson.name}
        id={lesson.id}
        courseId={lesson.course.id}
        weekday={dataForLesson.weekday}
        date={dataForLesson.date}
        timeInterval={dataForLesson.timeInterval}
        disabled={dataForLesson.disabled}
        key={lesson.id}
      />
    );
  });

  return (
    <>
      <Header title="Календарь" />
      <LayoutContainer>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {lessonsData}
        </Box>
      </LayoutContainer>
    </>
  );
};

export default ScheduleLessons;
