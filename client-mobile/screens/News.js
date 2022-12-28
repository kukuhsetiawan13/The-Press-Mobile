import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import Spinner from 'react-native-loading-spinner-overlay'
import { GET_ALL_NEWS } from '../queries/news';
import { useQuery } from '@apollo/client';


export default function News({route, navigation}) {

    const { loading, error, data } = useQuery(GET_ALL_NEWS)

    if(error) showToast('Error fetching data')

    useEffect(() => {
      showToast('Welcome to The PRESS')
    }, [])

    const showToast = (message) => {
      if(message == 'Error fetching data') {
        Toast.show({
          type: 'error',
          text1: message
        });
      } else if (message == 'Welcome to The PRESS') {
        Toast.show({
          type: 'success',
          text1: message
        });
      }
    }
    

    return (
        <View style={styles.container}>
          <Spinner
            visible={loading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />

          {data ? <NewsCard news={data.getAllNews} navigation={navigation}/> : null }
          
        </View>
      );
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      marginTop:20,
    },
    spinnerTextStyle: {
      color: '#FFF'
    }
  });  
