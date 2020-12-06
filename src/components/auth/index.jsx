import React from 'react';
import axios from 'axios';
import {
	View,
	StyleSheet,
	Button,
	Image,
	TouchableOpacity,
	Alert
} from 'react-native';
import { Icon, Input } from 'react-native-elements';
import Form from './form';
import Joi from 'joi-browser';

import { userLoggedIn } from '../../store/login';

class AuthScreen extends Form {
	state = {
		data: { username: '', password: '' },
		errors: {}
	};

	doSubmit = async () => {
		const { username, password } = this.state.data;
		try {
			const { data } = await axios.post(
				`http://192.168.8.101:9000/api/users/${username}/${password}`
			);

			this.props.dispatch(
				userLoggedIn({
					id: data._id,
					firstName: data.firstName,
					username: data.username,
					role: data.role,
					courses: data.courses
				})
			);

			this.props.navigation.push('AMMS-FOS');
		} catch (err) {
			console.log(err);
			const errors = { ...this.state.errors };
			errors.login = 'Invalid login, please try again';
			this.setState({ errors });
			Alert.alert(errors.login);
		}
	};

	render() {
		return (
			<TouchableOpacity style={styles.mainBody}>
				<View>
					<Image
						source={require('../../../images/3.png')}
						style={{
							width: '95%',
							height: 200,
							resizeMode: 'contain',
							margin: 20
						}}
					/>
				</View>

				<View>
					<Input
						placeholder='Username'
						leftIcon={<Icon name='user-o' type='font-awesome' />}
						onChangeText={value => this.handleChange(value, 'username')}
						value={this.state.data.username}
						containerStyle={styles.formInput}
					/>
					<Input
						placeholder='Password'
						leftIcon={<Icon name='key' type='font-awesome' />}
						onChangeText={value => this.handleChange(value, 'password')}
						value={this.state.data.password}
						secureTextEntry
						containerStyle={styles.formInput}
					/>
					<View style={styles.formButton}>
						<Button onPress={this.handleSubmit} title='Login' color='#1e90ff' />
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

/*const AuthScreen = () => {

    
}*/

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: 'yellow'
	},
	formInput: {
		margin: 15,
		flexDirection: 'column',
		justifyContent: 'center'
	},
	formButton: {
		margin: 10
	},
	mainBody: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#e0ffff',
		alignContent: 'center'
	}
});

export default AuthScreen;
