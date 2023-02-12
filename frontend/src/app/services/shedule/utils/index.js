import getUrl from '../../api';

const LESSONS_URL = getUrl('/courses/im/lessons/filter/');
const LESSON_UPDATE_DATE_URL = getUrl('/courses/reschedule-lesson');
const LESSON_UPDATE_LINK_URL = getUrl('/courses/reschedule-lesson');

export { LESSONS_URL, LESSON_UPDATE_DATE_URL, LESSON_UPDATE_LINK_URL };
