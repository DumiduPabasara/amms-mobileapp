import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import { Card, Badge } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AbsentLectures from './absentLectures';

class NotificationScreen extends Component {

    state = {
        absentLecCount : 1,
        lecUpdatesCount : 2,
        meetingCount: 0,
        submittedExcusStateCount: 2,
        modalVisible: false
    }
    
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    /*setModalType = (type) => {

        switch(type) {
            case 'absent':
                return <AbsentLectures />
            default: 
                return null;
        }

    }*/

    render() {

        const { absentLecCount, lecUpdatesCount, meetingCount, submittedExcusStateCount, modalVisible } = this.state;

        return(
            <LinearGradient
                colors={["#e0ffff", "#63a8e6"]}
                start={[0.1, 0.1]}
                style={styles.mainBody}
            >   
                <View>
                    <TouchableOpacity 
                        onPress={() => {
                            this.setModalVisible(!modalVisible);
                        }}
                    >
                    <Card style={styles.container}>
                        <Card.FeaturedTitle style={styles.title}>My Absent Lectures <Badge value={absentLecCount} status="error" /></Card.FeaturedTitle>
                        <Card.FeaturedSubtitle style={styles.subtitle}>You got {absentLecCount} new notifications</Card.FeaturedSubtitle>   
                    </Card>
                    </TouchableOpacity>
                    <Card style={styles.container}>
                        <Card.FeaturedTitle style={styles.title}>Lecture Schedule Updates <Badge value={lecUpdatesCount} status="error" /></Card.FeaturedTitle>
                        <Card.FeaturedSubtitle style={styles.subtitle}>You got {lecUpdatesCount} new notifications</Card.FeaturedSubtitle>   
                    </Card>
                    <Card style={styles.container}>
                        <Card.FeaturedTitle style={styles.title}>Mentor Meetings { meetingCount>1 ? <Badge value={meetingCount} status="error" /> : null } </Card.FeaturedTitle>
                        <Card.FeaturedSubtitle style={styles.subtitle}>You got {meetingCount} new notifications</Card.FeaturedSubtitle>   
                    </Card>
                    <Card style={styles.container}>
                        <Card.FeaturedTitle style={styles.title}>Submitted Excuses Status { submittedExcusStateCount>1 ? <Badge value={submittedExcusStateCount} status="error" /> : null }</Card.FeaturedTitle>
                        <Card.FeaturedSubtitle style={styles.subtitle}>You got {submittedExcusStateCount} new notifications</Card.FeaturedSubtitle>   
                    </Card>
                </View>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            this.setModalVisible(false);
                        }}
                    >
                        <Text>Modal</Text>
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
  
});

export default NotificationScreen;