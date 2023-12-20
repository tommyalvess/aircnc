//import liraries
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from '../assets/logo.png';
import api from '../services/api';

import { getSocket } from '../services/socketActions';

// create a component
const MyResquests = () => {
    const [requests, setRequests] = useState([]);//armazenar as reservar aprovadas e desaprovadas
    const socket = getSocket();

    async function handleAccept(id) {
        await api.post(`/bookings/${id}/approvals`);
        setRequests(requests.filter(request => request._id !== id));
    }
    
    async function handleReject(id) {
        await api.post(`/bookings/${id}/rejections`);
        setRequests(requests.filter(request => request._id !== id));
    }

    // useEffect(() => {     
           
    //     socket.on('booking_request', data => {
    //         console.log("foiiiiii");
            
    //         setRequests([...requests, data]);
    //     })
    // }, [requests, socket]);

    useEffect(() => {
        if (socket) {
            socket.on('booking_request', (data) => {
              console.log('Recebeu um evento:', data);
              setRequests([...requests, data]);
            });
          } else {
            console.error('Socket não está disponível.');
          }
    }, [requests, socket]);
    


    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />

            {requests.length == 0 ? 
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={styles.emptyText}>Ainda sem requisições.</Text>
                </View>
                :
                <ScrollView>
                    {requests.map(request => (
                        <View>
                            <Text> {request.user.email} está solicitando uma reserva em {request.spot.company} para a data: {request.date}</Text>

                            <TouchableOpacity onPress={() => handleAccept(request._id)}>
                                <Text style={styles.acceptButton}>Aceitar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleReject(request._id)}>
                                <Text style={styles.rejectButton}>Recusar</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                    } 

                </ScrollView>
            }


        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
      height: 32,
      resizeMode: "contain",
      alignSelf: 'center',
      marginTop: 10
    },
    emptyText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    acceptButton: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    rejectButton: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});

//make this component available to the app
export default MyResquests;
