import moment from 'moment';


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