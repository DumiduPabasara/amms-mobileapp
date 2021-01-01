import moment from 'moment';
import axios from 'axios';
import { baseUrl } from '../../api';


export const getDayAndTime = () => {
    const m = moment();
    return { day: m.day(), time: m.hour() };
};

export const isActive = schedule => {

    const { day, time } = getDayAndTime();

    const active =
      schedule.day === day &&
      time >= schedule.startTime &&
      time < schedule.startTime + schedule.duration;

    if (!active) {
      return false;
    }

    else {
      return true;
    }


};

//isMarked is always return boolean in this method
export const isMarked = async (student, course) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/api/attendance/${student}/${course}`
    );
    
    if(data) {
      return true;
    }

    else {
      return false;
    }

  } catch (err) {
    console.error(err.message);
    return false;
  }
};

//This is for absent lectures
export class Message {

  state = { course: {}, presentDays: [], absentDays: [] }

  constructor(course, presentDays) {
    this.state.course = course;
    this.state.presentDays = presentDays.map(date => this.getDate(date));
  }

  notify() {
    const { code, name, schedule } = this.state.course;
    this.getAbsentDays();

    return this.state.absentDays.length > 0 ? {
      code,
      name,
      schedule,
      absentDays: this.state.absentDays
    } : null;
  }

  getAbsentDays = () => {
    let arr = [];
    const { presentDays } = this.state;
    const { dates: totalDays, active } = this.state.course;
    const currentDate = moment().format('YYYY:MM:DD');

    if (totalDays.length > 0)
      arr = totalDays
        .map(date => this.getDate(date))
        .filter(date => !presentDays.includes(date));

    if (active) arr = arr.filter(date => date !== currentDate);

    this.state.absentDays = arr;
  }

  getDate = (date) => moment(date, 'YYYY:MM:DD HH:mm:ss').format('YYYY:MM:DD');

};

//This is for lecture updates
export class Notification {

  state = { course: {} }

  constructor(course) {
    this.state.course = course;
  }

  notify() {
    return this.status();
  }

  status() {
    const { code, name, schedule } = this.state.course;

    const now = moment();
    const currentDay = now.day();

    if (schedule.day === currentDay) {
      const timestamp = moment().hour(schedule.startTime).minutes(0).seconds(0);
      const remaining = timestamp.diff(now, 'minutes');

      const upcoming = remaining > 0;
      const ongoing = remaining <= 0 && remaining > -(schedule.duration * 60);

      if (upcoming || ongoing)
        return {
          code, name, time: remaining
        }
    }
    return null;
  }
}