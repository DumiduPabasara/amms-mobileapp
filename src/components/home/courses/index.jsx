import axios from 'axios';
import React, { Component } from 'react';
import {
	ScrollView,
	Text,
	Button,
	StyleSheet,
	Alert,
	View
} from 'react-native';
import { ListItem, Avatar, Card } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import Loading from '../../loading';
import moment from 'moment';
import { baseUrl } from '../../../api';
import { isActive, getDayAndTime, isMarked } from '../../common/scripts';

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
			this.setState({ courses, loading: false, marked: false });
		} catch (err) {
			console.log(err.message);
		}
	}

	/*timeout = () => {
    const { time } = getDayAndTime();
  }*/

	/*setTimeout(() => {
    window.location.reload();
  }, 1000);*/

	chooseDay = varDay => {
		return moment(varDay, 'day').format('ddd');
	};

	render() {
		const { courses, loading, marked } = this.state;
    const { day } = getDayAndTime();

		console.log(getDayAndTime());

		const sortedBasedOnActive = courses => {
			//const { day } = getDayAndTime();

			let coursesTodayA = [];
			let coursesOtherA = [];
			let activeCoursesA = [];
			let notActiveCourseA = [];

			coursesTodayA = courses.filter(course => course.schedule.day === day);
			coursesOtherA = courses
				.filter(course => course.schedule.day !== day)
				.sort((a, b) => a.schedule.day - b.schedule.day);

			let sortedCoursesToday = [...coursesTodayA, ...coursesOtherA];

			activeCoursesA = sortedCoursesToday.filter(course =>
				isActive(course.schedule)
			);
			notActiveCourseA = sortedCoursesToday.filter(
				course => !isActive(course.schedule)
			);

			let sortedCourses = [...activeCoursesA, ...notActiveCourseA];

			return sortedCourses;
		};

		/*console.log(sortedBasedOnActive(courses));*/
		console.log(this.props.markedQ);

		return loading ? (
			<Loading />
		) : (
			<View>
				<Card>
					<Card.FeaturedSubtitle
						style={{ color: '#1e90ff', justifyContent: 'center' }}>
						Your Courses
					</Card.FeaturedSubtitle>
					<Card.Divider />
					<ScrollView>
						{sortedBasedOnActive(courses).map(l => (
							<ListItem
								key={l.code}
								style={{ flex: 1, flexDirection: 'column' }}
								Component={TouchableScale}
								bottomDivider
								friction={90} //
								tension={100} // These props are passed to the parent component (here TouchableScale)
								activeScale={0.95} //
								linearGradientProps={{
									colors: isActive(l.schedule)
										? ['#adff2f', '#32cd32']
										: ['#ffd700', '#ffa500'],
									start: { x: 1, y: 0 },
									end: { x: 0.2, y: 0 }
								}}
								onPress={
									isActive(l.schedule)
										? this.props.markedQ
											? () =>
													Alert.alert(
														'Attendance is already marked for this course'
													)
											: () => {
													this.props.navigation.navigate('QRScanner_screen', {
														courseCode: l.code,
														id: this.props.user.id
													});
											  }
										: () => Alert.alert('Course not available at the moment')
								}>
								<Avatar size={52} containerStyle={{ alignItems: 'center' }}>
									{isActive(l.schedule) ? (
										<Text style={styles.timeStyle}>
											now{'\n'}
											{'\n'}
											{moment(l.schedule.startTime, 'h').format('h a')}{'\n'}to{'\n'}
											{moment(
												l.schedule.startTime + l.schedule.duration,
												'h'
											).format('h a')}
											{'\n'}
											{'\n'}
											{this.chooseDay(l.schedule.day)}
										</Text>
									) : (
										<Text style={styles.timeStyleD}>
											{this.chooseDay(l.schedule.day)}
										</Text>
									)}
								</Avatar>
								<ListItem.Content>
									<ListItem.Title>{l.code}</ListItem.Title>
									<ListItem.Subtitle
										style={isActive(l.schedule) ? styles.activeFontSize : null}>
										{l.name}
									</ListItem.Subtitle>
									{isActive(l.schedule) ? (
										<ListItem.Subtitle>
											Today's Lecture : Introduction{/*l.dates.map(k => ( k.date === day ? k.lecture : null))*/}
										</ListItem.Subtitle>
									) : null}
								</ListItem.Content>
								{isActive(l.schedule) ? (
									<ListItem.Chevron color='#e0ffff' />
								) : (
									<Text style={styles.timeStyleN}>
										at{'\n'}
										{moment(l.schedule.startTime, 'h').format('h a')} -{' '}
										{moment(
											l.schedule.startTime + l.schedule.duration,
											'h'
										).format('h a')}
									</Text>
								)}
								{/*<Text>{isActive(l.schedule).toString()}</Text>*/}
							</ListItem>
						))}
					</ScrollView>
				</Card>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	activeTrue: {
		backgroundColor: 'green'
	},
	activeFalse: {
		backgroundColor: 'red'
	},
	timeStyle: {
		fontSize: 12,
		color: '#e0ffff',
		textAlign: 'center',
    justifyContent: 'center',
    alignItems:'center',
    alignSelf:'center',
    marginBottom: 35,
    marginTop: -29 
	},
	timeStyleN: {
		fontSize: 12,
		color: '#fafad2',
		textAlign: 'center',
		justifyContent: 'center'
	},
	timeStyleD: {
		fontSize: 17,
		color: '#e0ffff',
		textAlign: 'center',
		marginBottom: 15
	},
	activeFontSize: {
		fontSize: 20,
		justifyContent: 'center',
		alignSelf: 'center'
	},
	mainBody: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center'
	}
});

export default Courses;
