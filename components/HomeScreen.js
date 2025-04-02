import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './AuthContext';

function HomeScreen({ navigation }) {
  const { email, setEmail } = useContext(AuthContext);
  const [inputEmail, setInputEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (inputEmail) {
      setEmail(inputEmail);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://www.solidbackgrounds.com/images/1080x1920/1080x1920-dark-midnight-blue-solid-color-background.jpg' }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.blueBox}>
          <Text style={styles.welcomeText}>ReUse Hub</Text>
        </View>
        {!email ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Brandeis Email"
              value={inputEmail}
              onChangeText={setInputEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.buttonWrapper} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        ) : (
          //<View style={styles.whiteBox}>
            //<Text style={styles.loggedInText}>Logged in as: {email}</Text>
          //</View>
          null
        )}
        {email && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonWrapper} onPress={() => navigation.navigate("Post Item")}>
              <Text style={styles.buttonText}>Giveaway</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonWrapper} onPress={() => navigation.navigate("View Items")}>
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonWrapper} onPress={() => navigation.navigate("Messages Screen")}>
              <Text style={styles.buttonText}>Messages</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  blueBox: {
    backgroundColor: '#007bff',
    padding: 20,
    marginBottom: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  whiteBox: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '60%',
  },
  welcomeText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 30,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
  },
  buttonWrapper: {
  marginBottom: 20,
  width: '100%',
  borderRadius: 5,
  backgroundColor: 'rgba(0, 123, 255, 0.5)', // 50% transparency
},
  buttonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    padding: 10,
  },
  loggedInText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
});

export default HomeScreen;
