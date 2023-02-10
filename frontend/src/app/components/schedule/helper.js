const getDataForSchedule = lesson => {
  const secondsFromStart = Date.parse(lesson.start_at);
  const secondsFromFinish = Date.parse(lesson.end_at);

  const newStart = new Date(secondsFromStart);

  const removeTimezone = ms => {
    const dateWithTimezone = new Date(ms);
    const dateWithouthTimezone = dateWithTimezone
      .setMinutes(dateWithTimezone.getMinutes() + dateWithTimezone.getTimezoneOffset());
    return new Date(dateWithouthTimezone);
  };

  const newStartWithouthTimezone = removeTimezone(secondsFromStart);
  const newFinishWithouthTimezone = removeTimezone(secondsFromFinish);

  const isPastLesson = !(newStart > new Date());

  const [
    month,
    weekday,
    day,
    startHour,
    startMinutes,
    finishHour,
    finishMinutes,
  ] = [
    newStart.getMonth(),
    newStart.getDay(),
    newStart.getDate(),
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
    weekday: dayOfWeek[weekday],
    date: `${normalizeDate(day, 'day')}.${normalizeDate(month, 'month')}`,
    timeInterval: getTimeInterval(),
    disabled: isPastLesson,
  };
};

export default getDataForSchedule;
