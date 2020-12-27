import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	Image,
	Alert,
	Button
} from 'react-native';
import { Icon } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { LinearGradient } from 'expo-linear-gradient';
import Loading from '../../../loading';
import { isActive } from '../../../common/scripts';
import { baseUrl } from '../../../../api';
import axios from 'axios';

const { width } = Dimensions.get('window');

const qrSizeW = width * 1.2;

export default class App extends Component {
	state = {
		CameraPermissionGranted: null,
		scanned: false,
		course: {},
		active: false,
		marked: false,
		password: '',
		loading: true
	};

	async componentDidMount() {
		// Ask for camera permission
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({
			CameraPermissionGranted: status === 'granted' ? true : false
		});

		//Getting courses from db
		try {
			const code = this.props.route.params.courseCode;
			const { data } = await axios.get(`${baseUrl}/api/courses/${code}`);

			const course = {
				id: data._id,
				code: data.code,
				name: data.name
			};

			const active = isActive(data.schedule);
			const marked = await this.isMarked(this.props.route.params.id, course.id);

			this.setState({
				course,
				active,
				password: data.password,
				marked,
				loading: false
			});
		} catch (err) {
			console.error(err);
		}
	}

	isMarked = async (student, course) => {
		try {
			const { data } = await axios.get(
				`${baseUrl}/api/attendance/${student}/${course}`
			);
			return data;
		} catch (err) {
			console.error(err.message);
			return false;
		}
	};

	markAttendance = async password => {
		if (password === this.state.password && !this.state.marked) {
			const obj = {
				student: this.props.route.params.id,
				course: this.state.course.id
			};

			try {
				await axios.post(`${baseUrl}/api/attendance`, obj);
				this.setState({ marked: true });
			} catch (err) {
				console.error(err);
			}
		}
	};

	renderQrScanner = () => {
		const { CameraPermissionGranted, scanned, loading, password } = this.state;
		const { courseCode } = this.props.route.params;
		const courseId = courseCode.toString().trim();

		const barCodeScanned = ({ data }) => {
			//Access the Data
			this.setState({ scanned: true });

			/*let scannedData = data;
      		console.log(scannedData);*/

			let scannedCourseId = data.slice(0, 7).trim();

			console.log(data);

			console.log(scannedCourseId.includes(courseId));
			console.log(data === password);

			if (scannedCourseId.includes(courseId) && data === password) {
				this.markAttendance(data);
				Alert.alert(
					'Successfully Marked !',
					`Your Attendance is marked for the course ${courseId}.`,
					[
						{
							text: 'Ok',
							onPress: () => {this.props.navigation.navigate('Home_screen', { post :"done" })} //pass to home screen							
						}
					],
					{ cancelable: false }
				);
			} else {
				Alert.alert(
					'Error !',
					`Invalid QR code scanned for the course ${courseId}. Please scan again !`,
					[
						{
							text: 'Ok',
							onPress: () => console.log('Cancel for scan again')
						}
					]
				);
			}

			/*alert(`Bar code with type ${type} and data ${data} has been scanned!`)
        alert(data);*/
		};

		if (CameraPermissionGranted === null) {
			// Request Permission
			return (
				<LinearGradient
					colors={['#e0ffff', '#63a8e6']}
					start={[0.1, 0.1]}
					style={styles.container}>
					<View>
						<Text>Requesting For Camera permission</Text>
						<Loading />
					</View>
				</LinearGradient>
			);
		}

		if (CameraPermissionGranted === false) {
			// Permission denied
			return (
				<LinearGradient
					colors={['#e0ffff', '#63a8e6']}
					start={[0.1, 0.1]}
					style={styles.mainBody}>
					<View style={styles.container}>
						<Text>Camera Permission Denied.</Text>
					</View>
				</LinearGradient>
			);
		}

		if (CameraPermissionGranted === true) {
			// Got the permission, time to scan
			return loading ? (
				<LinearGradient
					colors={['#e0ffff', '#63a8e6']}
					start={[0.1, 0.1]}
					style={styles.mainBody}>
					<Loading />
				</LinearGradient>
			) : (
				<LinearGradient
					colors={['#e0ffff', '#63a8e6']}
					start={[0.1, 0.1]}
					style={styles.mainBody}>
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center'
						}}>
						<BarCodeScanner
							onBarCodeScanned={scanned ? undefined : barCodeScanned}>
							<Image
								style={styles.qr}
								source={require('../../../../../images/QR.png')}
							/>
						</BarCodeScanner>
						{scanned && (
							<View>
								<Button
									style={{ marginTop: 20 }}
									title={'Tap to Scan Again'}
									onPress={() => this.setState({ scanned: false })}
								/>
							</View>
						)}
					</View>
				</LinearGradient>
			);
		}
	};

	render() {
		const { marked, password } = this.state;
		const code = this.props.route.params.courseCode;

		return !marked ? !password ? (

			<LinearGradient
				colors={['#e0ffff', '#63a8e6']}
				start={[0.1, 0.1]}
				style={styles.mainBody}	
		 	>
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Text>Please Wait Until Lecturer to generate QR code !</Text>
					<Loading />
				</View>
			</LinearGradient>

		)
		
		: this.renderQrScanner() : 

		(
			<LinearGradient
				colors={['#e0ffff', '#63a8e6']}
				start={[0.1, 0.1]}
				style={styles.mainBody}	
		 	>
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Icon
						name='calendar-check'
						type='font-awesome-5'
						color='green'
						size={300}
						containerStyle={{ marginTop: 30, marginBottom: 15}}
					/>
					<Text style={styles.textQ}>Your Attendance is Successfully Marked for the course {code}</Text>
					<Button
						title='Go To the Attendance Report'
						onPress={ () => {this.props.navigation.navigate('Home_screen', { screen : 'AMMS-FOS'}) , this.props.navigation.navigate('AMMS_FOS', { screen : 'AR_screen'})}}
					/>
				</View>
			</LinearGradient>
		);
		

		// this.props.navigation.navigate('Home_screen', { post: true });

		// !marked ? (
		// 	renderQrScanner()
		// ) : (
		// );

		// !marked && renderQrScanner();
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	qr: {
		marginTop: '10%',
		marginBottom: '10%',
		width: qrSizeW,
		height: qrSizeW
	},
	mainBody: {
		flex: 1,
		alignContent: 'center'
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
		marginBottom: 15
	}
});
