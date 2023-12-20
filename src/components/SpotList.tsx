//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../services/api';

// create a component
const SpotList = ({ tech }) => {
    const [spots, setSpots] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
      async function loadSpots() {
        const response = await api.get('/spots', {
          params: { tech }
        })
  
        setSpots(response.data);
      }
  
      loadSpots();
    }, []);
  
    function handleNavigate(id) {
      navigation.navigate('OtherStack', { screen: 'Book', params: { id } });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>
    
            <FlatList
            style={styles.list}
            data={spots}
            keyExtractor={spot => spot._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <View style={styles.listItem}>
                <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
                <Text style={styles.company}>{item.company}</Text>
                <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'GRATUITO'}</Text>
                <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
                    <Text style={styles.buttonText}>Solicitar reserva</Text>
                </TouchableOpacity>
                </View>
            )}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        marginTop: 30,
      },
    
      title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15,
      },
    
      bold: {
        fontWeight: 'bold'
      },
    
      list: {
        paddingHorizontal: 20,
      },
    
      listItem: {
        marginRight: 15,
      },
    
      thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,
      },
    
      company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
      },
    
      price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5
      },
    
      button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
      },
    
      buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
      },
});

//make this component available to the app
export default SpotList;
