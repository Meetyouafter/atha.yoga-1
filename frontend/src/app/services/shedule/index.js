import axios from 'axios';
import { LESSONS_URL, LESSON_UPDATE_DATE_URL, LESSON_UPDATE_LINK_URL } from './utils';
import authHeader from '../auth/header';

const postLessons = () => axios
  .post(LESSONS_URL, {}, { headers: authHeader() });

const postNewLessonDate = (index, date) => axios
  .post(`${LESSON_UPDATE_DATE_URL}/${index}/`, { reschedule_to: date }, { headers: authHeader() });

const postNewLessonLink = (index, link, linkInfo) => axios
  .post(`${LESSON_UPDATE_LINK_URL}/${index}/`, { link, linkInfo }, { headers: authHeader() });

const ScheduleService = { postLessons, postNewLessonDate, postNewLessonLink };

export default ScheduleService;
