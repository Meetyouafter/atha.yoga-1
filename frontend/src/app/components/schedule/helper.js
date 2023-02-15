const getDataForSchedule = lesson => {
  const startDate = new Date(lesson.start_at);
  const startTimezoneOffset = startDate.getTimezoneOffset() * 60000;
  const newStartWithouthTimezone = new Date(startDate.getTime() + startTimezoneOffset);

  const finishDate = new Date(lesson.end_at);
  const finishTimezoneOffset = finishDate.getTimezoneOffset() * 60000;
  const newFinishWithouthTimezone = new Date(finishDate.getTime() + finishTimezoneOffset);

  const isPastLesson = !(newStartWithouthTimezone > new Date());

  const [
    month,
    weekday,
    day,
    startHour,
    startMinutes,
    finishHour,
    finishMinutes,
  ] = [
    newStartWithouthTimezone.getMonth(),
    newStartWithouthTimezone.getDay(),
    newStartWithouthTimezone.getDate(),
    newStartWithouthTimezone.getHours(),
    newStartWithouthTimezone.getMinutes(),
    newFinishWithouthTimezone.getHours(),
    newFinishWithouthTimezone.getMinutes(),
  ];

  const dayOfWeek = {
    1: 'ПН',
    2: 'ВТ',
    3: 'СР',
    4: 'ЧТ',
    5: 'ПТ',
    6: 'СБ',
    7: 'ВС',
  };

  const normalizeDate = (num, type) => {
    if (num <= 9) {
      return type === 'month' ? `0${num + 1}` : `0${num}`;
    }
    return num;
  };

  const getTimeInterval = () => {
    const startTime = `${normalizeDate(startHour, 'hour')}:${normalizeDate(
      startMinutes,
      'minutes',
    )}`;
    const finishTime = `${normalizeDate(finishHour, 'hour')}:${normalizeDate(
      finishMinutes,
      'minutes',
    )}`;
    const timeInterval = `${startTime} - ${finishTime}`;
    return timeInterval;
  };

  return {
    name: lesson.course.name,
    id: lesson.id,
    weekday: dayOfWeek[weekday],
    date: `${normalizeDate(day, 'day')}.${normalizeDate(month, 'month')}`,
    timeInterval: getTimeInterval(),
    disabled: isPastLesson,
  };
};

export default getDataForSchedule;
