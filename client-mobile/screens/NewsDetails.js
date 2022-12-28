import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView
} from 'react-native'
import Toast from 'react-native-toast-message';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay'
import { useQuery } from '@apollo/client';
import { GET_NEWS_BY_ID } from '../queries/news';

export default function NewsDetails({route, navigation}) {

  const {id} = route.params

    const {loading, error, data} = useQuery(GET_NEWS_BY_ID, {
      variables: {
        newsId: Number(id)
      }
    })
    if(error) {
      showToast()
      navigation.navigate('Home')
    }
    
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
          {data
          ? 
          <ScrollView style={styles.content}>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{data.getNewsById.title}</Text>
                </View>
              <View style={styles.cardContent}>
                <View style={styles.header}>
                    <Image style={styles.mainImage} source={{uri:data.getNewsById.imgUrl}}/>
                </View>
              </View>
            </View>
  
            <View style={styles.card}>
              {/* <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{data.getNewsById.title}</Text>
              </View> */}
              <View style={styles.cardContent}>
                <View style={styles.flexJustifyBetween}>
                    <View style={styles.flexRow}>
                        <Text style={styles.textRed}>| </Text>
                        <Text style={styles.textSecondary}>{data.getNewsById.Category? data.getNewsById.Category.name : ''}</Text>
                    </View>
                    <View style={styles.flexRow}>
                        <Text style={styles.textSecondary}>By </Text>
                        <Text>{data.getNewsById.User? data.getNewsById.User.username: ''}</Text>
                    </View>
                </View>
              </View>
            </View>
  
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.newsContent}>{data.getNewsById.content}</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.textSecondary}>Tag: {data.getNewsById.PostTags && data.getNewsById.PostTags.length > 0 ? data.getNewsById.PostTags[0].Tag.name : ''}</Text>
              </View>
            </View>
  
          </ScrollView>
          :
          null
          }
        </View>
      );
}

const styles = StyleSheet.create({
    spinnerTextStyle: {
      color: '#FFF'
    },
    container:{
      flex:1,
      backgroundColor:"#ebf0f7",
    },
    content:{
      marginLeft:10,
      marginRight:10,
      marginTop:20,
    },
    header:{
      flexDirection:'row',
    },
    mainImage:{
      width:'100%',
      height:200,
    },
    smallImagesContainer:{
      flexDirection:'column',
      marginLeft:30
    },
    smallImage:{
      width:60,
      height:60,
      marginTop:5, 
    },
    btnColor: {
      height:40,
      width:40,
      borderRadius:40,
      marginHorizontal:3
    },
    contentColors:{
      flexDirection:'row', 
    },
    name:{
      fontSize:22,
      color:"#696969",
      fontWeight:'bold',
    },
    price:{
      marginTop:10,
      fontSize:18,
      color:"green",
      fontWeight:'bold'
    },
    description:{
      fontSize:18,
      color:"#696969",
    },
    shareButton: {
      marginTop:10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:30,
      backgroundColor: "#00BFFF",
    },
    shareButtonText:{
      color: "#FFFFFF",
      fontSize:20,
    },
  
    /******** card **************/
    card:{
      shadowColor: '#00000021',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
  
      marginVertical: 5,
      backgroundColor:"white",
      marginHorizontal: 5,
    },
    cardContent: {
      paddingVertical: 12.5,
      paddingHorizontal: 16,
    },
    cardHeader:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 12.5,
      paddingBottom: 25,
      paddingHorizontal: 16,
      borderBottomLeftRadius: 1,
      borderBottomRightRadius: 1,
    },
    cardTitle:{
        fontSize:22,
        color:"black"
    },
    newsContent:{
        fontSize:17,
        color:"black"
    },
    textSecondary: {
        fontSize:13,
        color: "#808080",
    },
    flexRow: {
        flexDirection: 'row',
        gap: 2
    },
    textRed: {
        color: 'red'
    },
    flexJustifyBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
  }); 