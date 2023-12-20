//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


import logo from '../assets/logo.png';
import api from '../services/api';


// create a component
const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    async function handleSubmit(): Promise<void> {
    
        const response = await api.post('/sessions', {
            email
        })
      
        const { _id, email } = response.data;
    
        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);
    
        navigation.navigate('Tabs');
        navigation.navigate('Tabs', { screen: 'List' });

    }

    useEffect(() => {
        //Validar se tem user logado para is par tela de list
        AsyncStorage.getItem('user').then(user => {
          if (user) {
            navigation.navigate('Tabs');
          }
        })
    }, []);

    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
            <Image source={logo} />

            <View style={styles.form}>
                <Text style={styles.label}>SEU E-MAIL *</Text>
            
                <TextInput
                style={styles.input}
                placeholder="Seu e-mail"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                />

                <Text style={styles.label}>TECNOLOGIAS *</Text>
                <TextInput
                style={styles.input}
                placeholder="Tecnologias de interesse"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={techs}
                onChangeText={setTechs}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Encontrar spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView> 
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
      },
    
      input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
      },
    
      button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
      },
    
      buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
      },
});

//make this component available to the app
export default Login;
