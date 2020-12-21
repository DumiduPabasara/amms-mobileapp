import React, { Component } from 'react';
import { Body, List, ListItem, Right, Text } from 'native-base';

class RenderNotification extends Component {

    


    

    render() {

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

        const renderAbsentList = () => {

            { 
              !this.lectures.marked && this.lectures.map((l) => {
    
                    <List>
                        <ListItem key={l.name}>
                            <Body>
                                <Text>{l.name}</Text>
                                <Text note>{l.subtitle}</Text>
                            </Body>
                            <Right>
                                <Text>{l.day}</Text>
                                <Text note>{l.time}</Text>
                            </Right>    
                        </ListItem>
                    </List>
                })
            }
    
           
        }

    }


}

export default RenderNotification;