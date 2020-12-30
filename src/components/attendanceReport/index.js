import React, { PureComponent } from 'react';
import { ScrollView, Text, Button, StyleSheet, Alert } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import axios from 'axios';
import TouchableScale from 'react-native-touchable-scale';
import moment from 'moment';
import { baseUrl } from '../../api';
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from 'react-native-animatable';
import Loading from '../loading';

class ARScreen extends PureComponent {

  state = { courses: [], loading: true };

  async componentDidMount() {
    const { courses: userCourses } = this.props.user;
    const courses = [];

    try {
      if (userCourses)
        for (let i = 0; i < userCourses.length; i++) {
          const { data: course } = await axios.get(
            `${baseUrl}/api/courses/${userCourses[i]}`
          );
          course.presentDates = await this.getPresentDates(course._id);
          courses.push(course);
        }

      this.setState({ courses, loading: false });

    } catch (err) {
      console.log(err.message);
    }

  }

  getPresentDates = async (courseId) => {
    const { data: dates } = await axios.post(
      `${baseUrl}/api/attendance/${this.props.user.id}/${courseId}`
    );

    const presentDates =
      dates && dates.length > 0
        ? dates.map(d =>
          moment(d.timestamp, 'YYYY:MM:DD HH:mm:ss').format('YYYY:MM:DD')
        )
        : [];

    return presentDates;
  }

  renderAverage = (present, total) => total <= 0 ? 0 : (present / total) * 100;

  /*renderAverage = (present, total) => {

    console.log(present, total)

    return (present / total) * 100;
  }*/

  render() {

    const { courses, loading } = this.state;

    const choseColor1 = (average) => {

      if (average >= 80) {
        return '#adff2f';
      }

      else if ( average < 60) {
        return '#f08080';
      }

      else {
        return '#ffd700';
      }

    }

    const choseColor2 = (average) => {

      if (average >= 80) {
        return '#32cd32';
      }

      else if ( average < 60 ) {
        return '#dc143c';
      }

      else {
        return '#ffa500';
      }

    }


    return (

      <LinearGradient
        colors={ ["#e0ffff", "#63a8e6"] }
        start={ [0.1, 0.1] }
        style={ styles.mainBody }
      >
        <ScrollView >
          { loading ? <Loading />
            :
            <Animatable.View animation="bounceInRight" duration={ 1500 } delay={ 500 }>
              <Card>
                <Card.FeaturedTitle style={ { color: '#1e90ff', justifyContent: 'center' } }>My Attendance Report</Card.FeaturedTitle>
                <Card.Divider />
                {
                  courses.map((l) => (
                    <ListItem
                      key={ l.code }
                      Component={ TouchableScale }
                      bottomDivider
                      friction={ 90 } //
                      tension={ 100 } // These props are passed to the parent component (here TouchableScale)
                      activeScale={ 0.95 } //
                      linearGradientProps={ {
                        colors: [choseColor1(this.renderAverage((l.presentDates.length), (l.dates.length))), choseColor2(this.renderAverage((l.presentDates.length), (l.dates.length)))],
                        start: { x: 1, y: 0 },
                        end: { x: 0.2, y: 0 },
                      } }
                      onPress={ () => this.props.navigation.navigate('DetailedReport_Screen', { courseCode: l.code, userId: this.props.user.id }) }
                    >

                      {/* l.el ? <Text style={{ fontSize: 20}} >{l.el}%</Text> : <Text style={{ fontSize: 20}} >60%</Text>*/ }
                      {<Text style={ { fontSize: 20 } } >{ `${this.renderAverage((l.presentDates.length), (l.dates.length)).toFixed(0).toString()}%` }</Text> }
                      <ListItem.Content >
                        <ListItem.Title style={ { color: '#faf0e6', fontWeight: 'bold' } }>
                          { l.code }
                        </ListItem.Title>
                        <ListItem.Subtitle style={ { color: '#ffffe0', flex: 1, flexDirection: 'row' } }>
                          { l.name }
                        </ListItem.Subtitle>
                        {/* { console.log(this.getPresentDates(l._id)) } */ }
                      </ListItem.Content>
                      <ListItem.Chevron color="white" />
                    </ListItem>
                  ))
                }
              </Card>
            </Animatable.View>
          }
        </ScrollView>
      </LinearGradient>

    )
  }
};

const styles = StyleSheet.create({

  mainBody: {
    flex: 1,
    alignContent: 'center',
  },

});




/*const ARScreen = () => {

    return(
        <View>
            <Text>This is Attendance Report</Text>
        </View>
    )
}*/

export default ARScreen;