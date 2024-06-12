import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.blueBox}>
        <Text style={styles.welcomeText}>Welcome to Buy Nothing Brandeis</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="About" onPress={() => navigation.navigate("About")} /> 
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Giveaway" onPress={() => navigation.navigate("Post Item")} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Search" onPress={() => navigation.navigate("View Items")} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Messages" onPress={() => navigation.navigate("Messages Screen")} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f5',
  },
  blueBox: {
    backgroundColor: '#007bff',
    padding: 20,
    marginBottom: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
  },
  buttonWrapper: {
    marginBottom: 20,
    width: '100%',
  },
  button: {
    fontSize: 18,
    padding: 10,
  },
});

export default HomeScreen;
