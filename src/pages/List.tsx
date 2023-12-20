//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

import { useDispatch, useSelector } from 'react-redux';
import { conectarSocket, desconectarSocket } from '../services/socketActions';


// create a component
const List = () => {
    const [techs, setTechs] = useState([]);

    const dispatch = useDispatch();
    const conectado = useSelector((state) => state.socket.conectado);
  
    useEffect(() => {
      // Conectar ao socket quando o componente montar
      dispatch(conectarSocket());
  
      // Substitua isso pelo código necessário para configurar a tela
  
      return () => {
        // Desconectar do socket quando o componente desmontar
        dispatch(desconectarSocket());
      };
    }, [dispatch]);
  

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
          const techsArray = storagedTechs.split(',').map(tech => tech.trim());
          setTechs(techsArray);
        })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)} 
            </ScrollView>
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
});

//make this component available to the app
export default List;
