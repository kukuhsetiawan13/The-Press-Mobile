import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
    Button
  } from 'react-native';
import mainImage from '../assets/Featured-Image6.jpg'


export default function NewsCard({route, navigation, news}) {

    const goToNewsDetails = (id) => {
        navigation.navigate('NewsDetails', {id})
    }

    const randomNumber1 = () => {
        return Math.floor(Math.random() * (10000 - 1000 + 1) + 1000)
    }

    const randomNumber2 = () => {
        return Math.floor(Math.random() * (1000 - 1 + 1) + 1)
    }

    const randomNumber3 = () => {
        return Math.floor(Math.random() * (24 - 1 + 1) + 1)
    }

    const renderItem = (post) => {
        const item = post.item;
        return (
          <TouchableOpacity key={item.id} onPress={() => goToNewsDetails(item.id)}>
          <View style={styles.card}>
            <Image style={styles.cardImage} source={{uri:item.imgUrl}}/>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.flexRow}>
                  <Text style={styles.textRed}>| </Text>
                  <Text style={styles.description}>{item.Category.name}</Text>
                </View>
                <View style={styles.timeContainer}>
                  <Image style={styles.iconData} source={{uri: 'https://img.icons8.com/office/512/user.png'}}/>
                  <Text style={styles.time}>{item.User.username} </Text>
                  <Text>  </Text>
                  <Image style={styles.iconData} source={{uri: 'https://img.icons8.com/material-outlined/512/square-clock.png'}}/>
                  <Text style={styles.time}>{randomNumber3()} hour ago</Text>
                </View>
              </View>
            </View>
            <View style={styles.cardFooter}>
              <View style={styles.socialBarContainer}>
                <View style={styles.socialBarSection}>
                  <TouchableOpacity style={styles.socialBarButton}>
                    <Image style={styles.icon} source={{uri: 'https://img.icons8.com/material/96/2ecc71/visible.png'}}/>
                    <Text style={styles.socialBarLabel}>{randomNumber1()}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.socialBarSection}>
                  <TouchableOpacity style={styles.socialBarButton}>
                    <Image style={styles.icon} source={{uri: 'https://img.icons8.com/ios-glyphs/75/2ecc71/comments.png'}}/>
                    <Text style={styles.socialBarLabel}>{randomNumber2()}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          </TouchableOpacity>
        )
    }


  return (
    <FlatList style={styles.list}
            data={news}
            keyExtractor= {(item) => item.id}
            ItemSeparatorComponent={() => {
              return (
                <View style={styles.separator}/>
              )
            }}
    renderItem={renderItem}/>
  )
}


const styles = StyleSheet.create({
    container:{
      flex:1,
      marginTop:20,
    },
    list: {
      paddingHorizontal: 17,
      backgroundColor:"#E6E6E6",
    },
    separator: {
      marginTop: 10,
    },
    /******** card **************/
    card:{
      shadowColor: '#00000021',
      shadowOffset: {
        width: 2
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      marginVertical: 8,
      backgroundColor:"white"
    },
    cardHeader: {
      paddingVertical: 17,
      paddingHorizontal: 10,
      borderTopLeftRadius: 1,
      borderTopRightRadius: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardContent: {
      paddingVertical: 12.5,
      paddingHorizontal: 16,
    },
    cardFooter:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 12.5,
      paddingBottom: 25,
      paddingHorizontal: 16,
      borderBottomLeftRadius: 1,
      borderBottomRightRadius: 1,
      backgroundColor:"#EEEEEE",
    },
    cardImage:{
      flex: 1,
      height: 150,
      width: null,
    },
    /******** card components **************/
    title:{
      fontSize:18,
      flex:1,
    }, 
    description:{
      fontSize:15,
      color:"#888",
      flex:1,
      marginTop:5,
      marginBottom:10,
    },
    time:{
      fontSize:13,
      color: "#808080",
      marginTop: 5
    },
    icon: {
      width:25,
      height:25,
    },
    iconData:{
      width:15,
      height:15,
      marginTop:8,
      marginRight:5
    },
    timeContainer:{
      flexDirection:'row',
      gap: 20
    },
    /******** social bar ******************/
    socialBarContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      flex: 1
    },
    socialBarSection: {
      justifyContent: 'center',
      flexDirection: 'row',
      flex: 1,
    },
    socialBarlabel: {
      marginLeft: 8,
      alignSelf: 'flex-end',
      justifyContent: 'center',
    },
    socialBarButton:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    flexRow: {
      flexDirection: 'row',
      alignContent: 'center'
    },
    textRed: {
      fontSize:15,
      color:"red",
      marginTop:5,
      marginBottom:10,
    }
  });  
