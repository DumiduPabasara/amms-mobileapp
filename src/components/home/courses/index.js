import axios from 'axios';
import React, { Component } from 'react';
import { ScrollView, Text, Button, StyleSheet, Alert } from 'react-native';
import { ListItem, Avatar, Card } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import { Loading } from '../../loading';
import moment from 'moment';
import { baseUrl } from '../../../api';

class Courses extends Component {
  state = { courses: [], loading: true };

  async componentDidMount() {
    const { courses: userCourses } = this.props.user;
    const courses = [];

    try {
      if (userCourses)
        for (let i = 0; i < userCourses.length; i++) {
          const { data } = await axios.get(
            `${baseUrl}/api/courses/${userCourses[i]}`
          );
          courses.push(data);
        }
      this.setState({ courses, loading: false });
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {

    const { courses } = this.state;

    const getDayAndTime = () => {
      const m = moment();
      return { day: m.day(), time: m.hour() };
    };

    console.log(getDayAndTime());

    const isActive = schedule => {

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

    const chooseDay = (varDay) => {

      switch(varDay) {
        case 1:
          return 'Mon';
        case 2:
          return 'Tue';
        case 3:
          return 'Wed';
        case 4:
          return 'Thu';
        case 5:
          return 'Fri';
        case 6:
          return 'Sat';
        default:
          return 'Sun';
        
      }

    };
  
    const sortedBasedOnActive = (courses) => {

      let activeCoursesA = [];

      let notActiveCourseA = [];

      activeCoursesA = courses.filter(course => isActive(course.schedule));
      notActiveCourseA = courses.filter(course => !isActive(course.schedule));

      let sortedCourses = [...activeCoursesA, ...notActiveCourseA];

      return sortedCourses;

    }

    /*console.log(sortedBasedOnActive(courses));*/

    const marked = false;

    return (
      <ScrollView>
        <Card>
          <Card.FeaturedSubtitle style={ { color: '#1e90ff', justifyContent: 'center' } }>Your Courses</Card.FeaturedSubtitle>
          <Card.Divider />
          {
            sortedBasedOnActive(courses).map((l) => (
              <ListItem
                key={ l.code }
                style={{ flex: 1, flexDirection: 'column'}}
                Component={TouchableScale}
                bottomDivider
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95} //
                linearGradientProps={{
                    colors: isActive(l.schedule) ? ['#adff2f','#32cd32'] : ['#ffd700','#ffa500'],
                    start: { x: 1, y: 0 },
                    end: { x: 0.2, y: 0 },
                }}
                onPress={ isActive(l.schedule) ? ( marked ? () => Alert.alert('Attendance is already marked for this course' ) : () => { this.props.navigation.navigate('QRScanner_screen', { courseCode: l.code }) }) : () => Alert.alert('Course not available at the moment' ) }
              >
                <Avatar size={ 68 } rounded activeOpacity={ 0.7 } containerStyle={{justifyContent:'center', alignSelf:'center', alignContent:'center'}}>
                  <Text style={styles.timeStyle}>{l.schedule.startTime.toString()} - {(l.schedule.startTime+l.schedule.duration).toString()}</Text>
                  <Text style={styles.timeStyle}>{chooseDay(l.schedule.day)}</Text>
                </Avatar>
                <ListItem.Content >
                  <ListItem.Title>{ l.code }</ListItem.Title>
                  <ListItem.Subtitle>{ l.name }</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron color="white" />
                {/*<Text>{isActive(l.schedule).toString()}</Text>*/}
              </ListItem>
            ))
          }
        </Card>
      </ScrollView>
    )
  }
};

const styles = StyleSheet.create({

  activeTrue: {
    backgroundColor: 'green'
  },
  activeFalse: {
    backgroundColor: 'red'
  },
  timeStyle: {
    fontSize: 20,
    color: '#fff8dc',
    textAlign: 'center',
    justifyContent: 'center'
  }

});

export default Courses;