import axios from 'axios';
import React, { Component } from 'react';
import { ScrollView, Text, Button, StyleSheet, Alert } from 'react-native';
import { ListItem, Avatar, Card } from 'react-native-elements';

class Courses extends Component {
  state = { courses: [], loading: false };

  async componentDidMount() {
    const { courses: userCourses } = this.props.user;
    const courses = [];

    try {
      if (userCourses)
        for (let i = 0; i < userCourses.length; i++) {
          const { data } = await axios.get(
            `http://192.168.1.100:9000/courses/${userCourses[i]}`
          );
          courses.push(data);
          console.log(courses);
          this.setState({ courses, loading: false });
        }
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {

    const { courses } = this.state;

    return (
      <ScrollView>
        <Card>
          <Card.FeaturedSubtitle style={ { color: '#1e90ff', justifyContent: 'center' } }>Your Courses</Card.FeaturedSubtitle>
          <Card.Divider />
          {
            courses.map((l) => (
              <ListItem
                key={ l.code }
                bottomDivider
                onPress={ true ? () => { this.props.navigation.navigate('QRScanner_screen', { courseCode: l.code }) } : () => Alert.alert('Course not available at the moment') }
              >
                <Avatar
                  size={ 50 }
                  overlayContainerStyle={ true ? styles.activeTrue : styles.activeFalse }
                  rounded
                  title={ l.schedule.startTime.toString() }
                  activeOpacity={ 0.7 }
                />
                <ListItem.Content>
                  <ListItem.Title>{ l.code }</ListItem.Title>
                  <ListItem.Subtitle>{ l.name }</ListItem.Subtitle>
                </ListItem.Content>
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

});

export default Courses;