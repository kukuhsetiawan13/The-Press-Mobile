import React from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';

export default function CategoryCard({categories, route, navigation}) {

    const renderItem = ({item}) => {
        return <TouchableOpacity key={item.id} style={styles.notificationBox} onPress={() => goToFilteredNews(item.id, item.name)}>
            <Text  style={styles.description}>{item.name}</Text>
        </TouchableOpacity>
        
    }

    const goToFilteredNews = (id, name) => {
        navigation.navigate('News by Filter', {categoryName: name})
    }

  return (
    <FlatList
        style={styles.notificationList}
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
    />  
  )
}

const styles = StyleSheet.create({
    notificationList:{
        paddingHorizontal:10,
        paddingBottom: 10,
        marginBottom: 400
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
