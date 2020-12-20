import React from 'react';
import { View, Text, Alert, Button } from 'react-native';
import { userLoggedOut } from '../../store/login';
import { useDispatch } from 'react-redux';


const LogOut = () => {

	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(userLoggedOut());
		console.log('Logging Out');
	};

    return(
        <View>
            <Button
                title="Log Out"
                onPress={ () => handleLogout() }
             />
        </View>
    )
}

export default LogOut;