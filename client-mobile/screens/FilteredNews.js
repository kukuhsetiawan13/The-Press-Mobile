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

export default function FilteredNews({route, navigation}) {

    const {loading, error, data} = useQuery(GET_ALL_NEWS)
    if(error) {
      showToast()
      navigation.navigate('Categories')
    }

    const [filteredNews, setfilteredNews] = useState([])

    const {categoryName} = route.params

    useEffect(() => {
      const newArray = data.getAllNews.filter(el => el.Category.name == categoryName)
      setfilteredNews(newArray)
    }, [])

    const showToast = () => {
      Toast.show({
        type: 'error',
        text1: 'Error fetching data'
      });
    }


    return (
        <View style={styles.container}>
          <Spinner
            visible={loading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
          {data ? <NewsCard news={filteredNews} navigation={navigation} /> : null}
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
