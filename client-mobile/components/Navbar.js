import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Navbar() {
  return (
    <View style={styles.navbar}>
      <Text style={styles.textNavbar}>The Press</Text>
      <StatusBar style="auto" />
    </View>
    )
  }

  const styles = StyleSheet.create({
    navbar: {
        backgroundColor: 'black',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    textNavbar: {
        color: 'white',
        fontSize: 30
    }
  });
  