import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, Alert, FlatList } from 'react-native';
import { Card, Badge } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

class NotificationScreen extends Component {

    state = {
        absentLecCount : 1,
        lecUpdatesCount : 2,
        meetingCount: 0,
        submittedExcusStateCount: 2,
        modalVisible: false,
    }
    
    setModalVisible = (visible,type) => {
        this.setState({ modalVisible: visible });
    }


    render() {

        const { absentLecCount, lecUpdatesCount, meetingCount, submittedExcusStateCount, modalVisible, componentType } = this.state;

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
                <View>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={() => {
                            this.setModalVisible(false);
                        }}
                    >
                        <View style={styles.containerflat}>
                            <FlatList 
                                style={styles.notificationList} 
                                enableEmptySections={true}
                                data={lectures}
                                keyExtractor= {(item) => {
                                    return item.name;
                                }}
                                renderItem={({item}) => {
                                    return (
                                        <View style={styles.notificationBox}>
                                            <Text style={styles.description}>{item.name}</Text>
                                            <Text style={styles.description}>{item.subtitle}</Text>
                                        </View>
                                    )
                                }}
                            />
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
        backgroundColor:'#DCDCDC'
    },
    notificationList:{
        marginTop:20,
        padding:10,
    },
    notificationBox: {
        padding:20,
        marginTop:5,
        marginBottom:5,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius:10,
    },
    description:{
        fontSize:18,
        color: "#3498db",
        marginLeft:10,
    },
  
});

export default NotificationScreen;