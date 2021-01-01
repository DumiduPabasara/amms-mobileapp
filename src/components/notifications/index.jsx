import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, Alert, FlatList, Button } from 'react-native';
import { Card, Badge, ListItem } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { baseUrl} from '../../api';
import moment from 'moment';
import axios from 'axios';
import { Notification, Message, isActive } from '../common/scripts';

class NotificationScreen extends Component {

    state = {
        absentLecCount : 0,
        lecUpdatesCount : 2,
        meetingCount: 0,
        submittedExcusStateCount: 0,
        absentModalVisible: false,
        lectureScheduleModalVisible: false,
        messages: [], 
        courses: [],
        watchedAbsent: false,
        watchedLecUpdates: false,
        watchedMeetings: false,
        watchedSubmitExcuses: false,
    }

    async componentDidMount() {
		try {
            //absent Lectures
			await this.renderData();
			this.loadMessages();
		} catch (err) {
			console.error(err.message);
		}
    }
    
    //render Courses
    renderData = async () => {
		const { id } = this.props.user;
		const { data } = await axios.get(`${baseUrl}/api/users/${id}`);
		this.setState({ courses: data.courses });
    };
    
    /**************************************************************************************************************/

    //absent lectures
	loadMessages = () => {
		const { courses, messages } = { ...this.state };
		let absentLecCount = 0;

		if (courses && courses.length > 0) {
			courses.forEach(async c => {
				const { data } = await axios.get(`${baseUrl}/api/courses/${c}`);
				const course = {
					id: data._id,
					code: data.code,
					name: data.name,
					schedule: data.schedule,
					dates:
						data.dates && data.dates.length > 0
							? data.dates.map(d => d.date)
							: [],
					active: isActive(data.schedule)
				};

				// get present dates
				const { data: dates } = await axios.post(
					`${baseUrl}/api/attendance/${this.props.user.id}/${course.id}`
				);

				const presentDates =
					dates && dates.length > 0
						? dates.map(d =>
								// moment(d.timestamp, 'YYYY:MM:DD HH:mm:ss').format('YYYY:MM:DD')
								moment(d.timestamp, 'YYYY:MM:DD HH:mm:ss')
						  )
						: [];

				// get messages for the current course
				const message = new Message(course, presentDates).notify();

				if (message) {
					absentLecCount++;
					messages.push(message);
                }
                
                //sorting messages before set state
                messages.sort((a, b) =>
                    this.isAfter(
                        a.absentDays[a.absentDays.length - 1],
                        b.absentDays[b.absentDays.length - 1]
                    )
                );

				this.setState({ messages, absentLecCount });
			});
		}
    };
    
    getDuration = (day, schedule) =>
		moment(day, 'YYYY:MM:DD')
			.hour(schedule.startTime + schedule.duration)
			.fromNow();

	isAfter = (day1, day2) => {
		day1 = moment(day1, 'YYYY:MM:DD');
		day2 = moment(day2, 'YYYY:MM:DD');

		return moment(day1).isAfter(day2) ? -1 : 1;
	};

	getAbsentDays = ({ absentDays, schedule }) => {
		absentDays.sort((a, b) => this.isAfter(a, b));

		let string = '';
		absentDays.forEach(day => {
			string += !string ? day : `, ${day}`;
			string += ` (${this.getDuration(day, schedule)})`;
		});
		return string;
    };

    /**************************************************************************************************************/
    
    //setting modal visibilities
    
    setAbsentModalVisible = (visible) => {
        this.setState({ absentModalVisible: visible });
    }

    setLectureScheduleModalVisible = (visible) => {
        this.setState({ lectureScheduleModalVisible: visible });
    }

    /**************************************************************************************************************/

    render() {

        const { 

            absentLecCount, 
            lecUpdatesCount, 
            meetingCount, 
            submittedExcusStateCount, 
            absentModalVisible, 
            lectureScheduleModalVisible,
            messages,
            watchedAbsent

        } = this.state;

        const lectures = [
    
            {
                name: 'Lecture 1',
                subtitle: 'Introduction to Programming Languages',
                time:'10.00',
                day: 'Nov 22',
                marked: false
            },
    
            {
                name: 'Lecture 2',
                subtitle: 'OOP in php',
                time:'10.02',
                day: 'Nov 30',
                marked: true
            },
            
        ]

        const lectures2 = [
    
            {
                name: 'Lecture 3',
                subtitle: 'Introduction to Programming Languages',
                time:'10.00',
                day: 'Nov 22',
                marked: false
            },
    
            {
                name: 'Lecture 4',
                subtitle: 'OOP in php',
                time:'10.02',
                day: 'Nov 30',
                marked: true
            },
            
        ]

        return(
            <LinearGradient
                colors={["#e0ffff", "#63a8e6"]}
                start={[0.1, 0.1]}
                style={styles.mainBody}
            >   
                <View>
                    <TouchableOpacity 
                        onPress={() => {
                            this.setAbsentModalVisible(!absentModalVisible);
                        }}
                    >
                    <Card style={styles.container}>
                        <Card.FeaturedTitle style={styles.title}>My Absent Lectures { absentLecCount && !watchedAbsent ?<Badge value={absentLecCount} status="error" />: null}</Card.FeaturedTitle>
                        <Card.FeaturedSubtitle style={styles.subtitle}>You got {absentLecCount} notifications</Card.FeaturedSubtitle>   
                    </Card>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {
                            this.setLectureScheduleModalVisible(!lectureScheduleModalVisible);
                        }}
                    >
                    <Card style={styles.container}>
                        <Card.FeaturedTitle style={styles.title}>Lecture Schedule Updates { lecUpdatesCount>=1 ?<Badge value={lecUpdatesCount} status="error" />: null}</Card.FeaturedTitle>
                        <Card.FeaturedSubtitle style={styles.subtitle}>You got {lecUpdatesCount} notifications</Card.FeaturedSubtitle>   
                    </Card>
                    </TouchableOpacity>
                    <Card style={styles.container}>
                        <Card.FeaturedTitle style={styles.title}>Mentor Meetings { meetingCount>=1 ? <Badge value={meetingCount} status="error" /> : null } </Card.FeaturedTitle>
                        <Card.FeaturedSubtitle style={styles.subtitle}>You got {meetingCount} new notifications</Card.FeaturedSubtitle>   
                    </Card>
                    <Card style={styles.container}>
                        <Card.FeaturedTitle style={styles.title}>Submitted Excuses Status { submittedExcusStateCount>=1 ? <Badge value={submittedExcusStateCount} status="error" /> : null }</Card.FeaturedTitle>
                        <Card.FeaturedSubtitle style={styles.subtitle}>You got {submittedExcusStateCount} new notifications</Card.FeaturedSubtitle>   
                    </Card>
                </View>
                {/******************Absent Modal********************************************************************************************************************************************************************/}
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={absentModalVisible}
                        onRequestClose={() => {
                            this.setAbsentModalVisible(false);
                        }}
                    >
                        <View style={styles.containerflat}>
                            <FlatList 
                                style={styles.notificationList} 
                                enableEmptySections={true}
                                data={messages}
                                keyExtractor= {(item) => {
                                    return item.code;
                                }}
                                renderItem={({item}) => {
                                    return (
                                        <ListItem>
                                            <View style={styles.notificationBox}>
                                                <ListItem.Content>
                                                <Text style={styles.description}>{item.name} ({item.code})</Text>
                                                <Text style={styles.description}>missed {item.absentDays.length > 1 ? 'lectures' : 'lecture'} on{' '}{this.getAbsentDays(item)}</Text>
                                                </ListItem.Content>
                                            </View>
                                        </ListItem>
                                )
                                }}
                            />
                            <Button title='close' onPress={() => this.setAbsentModalVisible(false)}/>
                        </View>
                    </Modal>
                </View>
                {/*****************************Lecture Schedule Modal*****************************************************************************************************************************************************************/}
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={lectureScheduleModalVisible}
                        onRequestClose={() => {
                            this.setLectureScheduleModalVisible(false);
                        }}
                    >
                        <View style={styles.containerflat}>
                            <FlatList 
                                style={styles.notificationList} 
                                enableEmptySections={true}
                                data={lectures2}
                                keyExtractor= {(item) => {
                                    return item.name;
                                }}
                                renderItem={({item}) => {
                                    return (
                                        <ListItem>
                                            <View style={styles.notificationBox}>
                                                <ListItem.Content>
                                                <Text style={styles.description}>{item.name}</Text>
                                                <Text style={styles.description}>{item.subtitle}</Text>
                                                </ListItem.Content>
                                            </View>
                                        </ListItem>
                                )
                                }}
                            />
                            <Button title='close' onPress={() => this.setLectureScheduleModalVisible(false)}/>
                        </View>
                    </Modal>
                </View>
            </LinearGradient>
        )

    }
}


const styles = StyleSheet.create({

    mainBody: {
      flex: 1,
      alignContent: 'center',
    },
    title: {
        color: '#1e90ff'
    },
    subtitle : {
        color: '#d7d7db'
    },
    container : {
        width : 50
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    containerflat:{
        backgroundColor:'#DCDCDC',
        justifyContent: 'center'
    },
    notificationList:{
        marginTop:20,
        padding:5,
    },
    notificationBox: {
        padding:10,
        marginTop:5,
        marginBottom:5,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius:10,
    },
    description:{
        fontSize:18,
        color: "red",
    },
  
});

export default NotificationScreen;