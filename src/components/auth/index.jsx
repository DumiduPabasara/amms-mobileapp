import React from 'react';
import axios from 'axios';
import {
	View,
	StyleSheet,
	Button,
	Image,
	Alert
} from 'react-native';
import { Icon, Input } from 'react-native-elements';
import Form from './form';
import Joi from 'joi-browser';
import { baseUrl } from '../../api';
import { LinearGradient } from "expo-linear-gradient";

import { userLoggedIn } from '../../store/login';
import Loading from '../loading';

class AuthScreen extends Form {

	constructor(props) {
		super(props)
		this.inputPassword = React.createRef();
	}
	state = {
		data: { username: '', password: '' },
		errors: {},
		loading : true,
		btnPressed : false
	};

	doSubmit = async () => {
		const { username, password } = this.state.data;
		try {
			const { data } = await axios.post(
				`${baseUrl}/api/users/${username.trim()}/${password}`
			);

			this.props.dispatch(
				userLoggedIn({
					id: data._id,
					firstName: data.firstName,
					username: data.username,
					role: data.role,
					courses: data.courses,
					cityOrTown: data.cityOrTown,
					country: data.country
				})
			);

			this.setState({ loading: false });
		} catch (err) {
			console.log(err);
			const errors = { ...this.state.errors };
			errors.login = 'Invalid Username or Password, please try again';
			this.setState({ errors });
			Alert.alert(
				'Login Error !',
				errors.login,
				[
					{
						text: 'Ok',
						onPress: () => this.setState({ btnPressed: false})
					}
				],
				{cancelable: false}
				
			);
		}
	};
	
	render() {

		const { loading, btnPressed, errors } = this.state;

		return (
			<LinearGradient
                colors={["#e0ffff", "#63a8e6"]}
                start={[0.1, 0.1]}
                style={styles.mainBody}
            >
			<View>
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
						value={this.state.data.username.trim()}
						containerStyle={styles.formInput}
						returnKeyType="next"
						autoCapitalize="none"
						autoFocus
						autoCompleteType='off'
						errorMessage={errors['username']}
						renderErrorMessage={true}
						onEndEditing={() => { this.inputPassword.focus(); }}
						
					/>
					<Input
						ref={(input) => { this.inputPassword = input }}
						placeholder='Password'
						leftIcon={<Icon name='key' type='font-awesome' />}
						onChangeText={value => this.handleChange(value, 'password')}
						value={this.state.data.password}
						secureTextEntry
						containerStyle={styles.formInput}
						autoCompleteType='off'
						autoCapitalize="none"
						errorMessage={errors['password']}
						renderErrorMessage={true}
						onEndEditing={this.handleSubmit}
					/>
					<View style={styles.formButton}>
						<Button onPress={this.handleSubmit} title='Login' color='#1e90ff' />
					</View>
					{ loading && btnPressed ? <Loading /> : <View></View>}
				</View>
			</View>
			</LinearGradient>
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
		alignContent: 'center'
	}
});

export default AuthScreen;
