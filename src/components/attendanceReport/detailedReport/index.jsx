import React, { useEffect, useState } from 'react';
import { ScrollView, Text, Button, StyleSheet, Alert } from 'react-native';
import { ListItem, Avatar, Icon } from 'react-native-elements';
import { LinearGradient } from "expo-linear-gradient";
import { View } from 'react-native-animatable';
import moment from 'moment';
import axios from 'axios';
import { baseUrl } from '../../../api';

export default function DetailedReport( {navigation, route}) {

    const { courseCode, userId } = route.params;
    const courseId = courseCode.toString();

    const [presentData, setPresentData] = useState([]);
    const [courseData, setCourseData] = useState({});
    const [isTrue, setTrue] = useState(false);

    useEffect (() => {
        
        navigation.setOptions({ title: `Detailed Report for ${courseId}` });

        const fetchCourseData = async () => {

            try {

                const { data } = await axios.get(`${baseUrl}/api/courses/${courseCode}`);

                const course = {
                    id: data._id,
                    dates: data.dates
                };

                setCourseData(data);

                fetchAttendanceData(course);

            } catch (err) {
                console.error(err.message);
                return false;
            }

        };

        const fetchAttendanceData = async (course) => {

            try {

                const { data : attendance } = await axios.post(
                    `${baseUrl}/api/attendance/${userId}/${course.id}`
                );
                
                const presentDates =
				attendance && attendance.length > 0
					? attendance.map(d =>
							moment(d.timestamp, 'YYYY:MM:DD HH:mm:ss').format('YYYY:MM:DD')
					  )
                    : [];
                    
                setPresentData(presentDates);
                
            } catch (err) {
                console.error(err.message);
                return false;
            }
        }

        fetchCourseData();                  

    }, []);

    const getDate = date => {
        return moment(date, 'YYYY:MM:DD HH:mm:ss').format('YYYY:MM:DD');
    };    

    const isPresent = (date, presentDates) => {
        return presentDates.includes(getDate(date));
        //bug in frontend: color will misbehave if course have more than 2 lectures on same day
        //sol: check the time difference according to the backend timeout method (current 5 min)

        /*const timeOut = 15;

        for (let i = 0; i < presentDates.length; i++) {

            var ms = moment(presentDates[i],"YYYY:MM:DD HH:mm:ss").diff(moment(date,"YYYY:MM:DD HH:mm:ss"));
            var d = moment.duration(ms);

            console.log(d.days() + ':' + d.hours() + ':' + d.minutes() + ':' + d.seconds());

            if( presentDates.includes(getDate(date)) ) {
                return true;
            }

        }

        return false;*/
    
    };

    const chooseDay = (day) => {
       return moment(day, 'YYYY:MM:DD HH:mm:ss').format('MMM Do')
    }

    const chooseTime = (time) => {
       return moment(time, 'YYYY:MM:DD HH:mm:ss').format('h:mm a')
    }

    const { dates: records } = courseData ;

    if(records) {

        return (
    
            <LinearGradient
                colors={["#e0ffff", "#63a8e6"]}
                start={[0.1, 0.1]}
                style={styles.mainBody}
            >
                <ScrollView>
                {
                    records.map((l, index) => (
                        <ListItem
                            key={l._id}
                            bottomDivider
                            linearGradientProps={{
                                colors: isPresent(l.date, presentData) ? ['#adff2f','#32cd32'] : ['#f08080','#dc143c'],
                                start: { x: 1, y: 0 },
                                end: { x: 0.2, y: 0 },
                            }}
                            //onPress = {() => this.props.navigation.navigate('DetailedReport_Screen', { courseCode: l.code } )}
                        >
                            <Avatar 
                                size={52} 
                                containerStyle={{ alignItems: 'center' }}
                            >
                                { isPresent(l.date, presentData)
                                ?
                                <Icon
                                    name='check'
                                    type='font-awesome'
                                    color='#ffffe0'
                                />
                                :
                                <Icon
                                    name='times'
                                    type='font-awesome'
                                    color='#ffffe0'
                                />
                                }
                                { isPresent(l.date, presentData) ? <Text style={styles.text}>Present</Text> : <Text style={styles.text}>Absent</Text>}
                            </Avatar>
                            <ListItem.Content >
                                <ListItem.Title style={styles.textN}>
                                    Lecture {index+1}
                                </ListItem.Title>
                                <ListItem.Subtitle style={styles.textS}>
                                    {l.lecture}
                                </ListItem.Subtitle>  
                            </ListItem.Content>
                            <View>
                                <Text style={styles.timeStyle}>{chooseDay(l.date)}</Text>
                                <Text style={styles.timeStyle}>{chooseTime(l.date)}</Text>
                            </View>
                        </ListItem>
                    ))
                }
                <Text style={styles.textQ}>Exisiting Records will Display Here !</Text>
                </ScrollView>  
            </LinearGradient>
        )

    }

    else {

        return (
            <View 
                style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text style={styles.textQ}>No Records Available Yet !</Text>
            </View>
        )
    }

    
}

const styles = StyleSheet.create({

    mainBody: {
      flex: 1,
      alignContent: 'center',
    },
    timeStyle: {
        fontSize: 20,
        color: '#005e5e',
        textAlign: 'center',
        justifyContent: 'center'
    },
    textQ:{
		fontWeight:'900', 
		textAlign:'center', 
		fontSize: 26.5, 
		textAlignVertical:'auto', 
		alignSelf:'baseline', 
		textDecorationColor:'green', 
		flexWrap:'wrap', 
		fontFamily:'sans-serif-light',
        marginBottom: 15,
        marginTop: 30
    },
    textN: {
        color: '#faf0e6', 
        fontWeight: 'bold',
        fontSize: 20
    },
    textS: {
        color: '#ffffe0', 
        flex:1, 
        flexDirection:'row',
        fontSize: 15,
        flexGrow: 5
    },
    text: {
        color: '#ffffe0',
        fontSize: 10
    },
  
  });
