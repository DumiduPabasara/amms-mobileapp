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