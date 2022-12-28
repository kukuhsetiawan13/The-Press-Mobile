import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import axios from 'axios';
import CategoryCard from '../components/CategoryCard';
import mainImage from '../assets/Featured-Image6.jpg'
import Spinner from 'react-native-loading-spinner-overlay'
import Toast from 'react-native-toast-message';
import { useQuery } from '@apollo/client';
import { GET_ALL_CATEGORIES } from '../queries/category';

export default function Navbar({navigation}) {

    const {loading, error, data} = useQuery(GET_ALL_CATEGORIES)
      
    if(error) {
      showToast()
      navigation.navigate('News')
    }

    const showToast = () => {
        Toast.show({
          type: 'error',
          text1: 'Error fetching data'
        });
    }

  return (
        <View>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.card}>
                <Image style={styles.cardImage} source={mainImage}/>
                <View style={styles.cardContent}>
                    <View>
                        <Text style={styles.title}>Your daily source of truth</Text>
                    </View>
                </View>
            </View>
            <View style={styles.category}>
                <Text>Please choose the category:</Text>
            </View>
            {data ? <CategoryCard categories={data.getAllCategories} navigation={navigation} /> : null}
        </View>
    )
  }

  const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    notificationBox: {
        padding:20,
        marginTop:5,
        marginBottom:5,
        backgroundColor: '#EBEBEB',
        flexDirection: 'row',
        borderRadius:10,
    },
    description:{
        fontSize:18,
        color: "#3498db",
        marginLeft:10,
    },
    card:{
        margin: 0,
        marginTop: 10,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: "#DCDCDC",
        backgroundColor: "#DCDCDC",
      },
      cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
        //overlay efect
        flex: 1,
        height: 200,
        width: null,
        position: 'absolute',
        zIndex: 100,
        left: 0,
        right: 0,
        backgroundColor: 'transparent'
      },
      cardImage: {
        height: 300,
        width: '100%'
      },
      title:{
        fontSize:28,
        color: "#ffffff",
        marginTop: 10,
        fontWeight:'bold'
      },
      time:{
        fontSize:13,
        color: "#ffffff",
        marginTop: 5
      },
      category: {
        marginTop:10,
        // backgroundColor: 'yellow',
        padding: 10
      }
  });
  