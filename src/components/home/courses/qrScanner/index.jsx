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

	render() {
		const {
			CameraPermissionGranted,
			scanned,
			password,
			loading,
			marked
		} = this.state;
		const { courseCode } = this.props.route.params;
		const courseId = courseCode.toString();

		const barCodeScanned = ({ data }) => {
			//Access the Data
			this.setState({ scanned: true });

			/*let scannedData = data;
      console.log(scannedData);*/

			let scannedCourseId = data.slice(0, 7);

			/*console.log(scannedCourseId);*/

			/*console.log(scannedCourseId.includes(courseId));*/

			if (scannedCourseId.includes(courseId) && data === password) {
				this.markAttendance(data);
				Alert.alert(`Your Attendance is marked for the course ${courseId}`);
			} else {
				Alert.alert(`Invalid QR code scanned for the course ${courseId} !`);
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
	}
});

/*import React, {  Component } from 'react';
import { Text, View, StyleSheet, Button, Dimensions, Image, Alert} from 'react-native';
import Loading from '../../../loading';
import { BarCodeScanner } from 'expo-barcode-scanner';

class QRScannerScreen extends Component {

  /*const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  state = {
    hasPermission : null,
    setHasPermission : null,
    scanned : false,
    setScanned: false,
  }

  componentDidMount() {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    if(status === 'granted') {
      this.setState({ setHasPermission : status});
    }
  }

  render() {

    const { width } = Dimensions.get('window');
    const qrSize = width * 1.2;

    const handleBarCodeScanned = ({ data }) => {

      setScanned(true);
  
      let scannedData = data;
  
      let scannedCourseId = scannedData.slice(0,7);
  
      /*console.log(scannedCourseId);*/

/*console.log(scannedCourseId.includes(courseId));
  
      if ( scannedCourseId.includes(courseId) ) {
  
        Alert.alert(`Your Attendance is marked for the course ${courseId}`);
      }
  
      else {
        Alert.alert(`Invalid QR code scanned for ${courseId} !`);
      }
  
      /*alert(`Bar code with type ${type} and data ${data} has been scanned!`)
  
    };

    if (hasPermission === null) {

      return (
        <View>
          <Text>Requesting for camera permission</Text>
          <Loading />
        </View>
      );
    }

    else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={[StyleSheet.absoluteFill, styles.container]}
          >
            <Image
              style={styles.qr}
              source={require('../../../../../images/QR.png')}
            />
          </BarCodeScanner>
    
          {scanned && <Button title={'Tap to Scan Again'} onPress={() => this.setState({ setScanned : false})} />}
        </View>
      );
    }


  }
    
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
      },
      qr: {
        marginTop: '10%',
        marginBottom: '20%',
        width: qrSize,
        height: qrSize,
      },

})


export default QRScannerScreen;*/
