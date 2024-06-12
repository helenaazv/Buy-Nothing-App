// AboutScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <Text style={styles.text}>
      Buy Nothing Brandeis is a mobile application designed to foster a community of generosity and sustainability among students and faculty at Brandeis University. The app provides a platform for users to freely exchange goods and services without monetary transactions, promoting a culture of sharing and reducing waste on campus.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AboutScreen;
