import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

function PostItemScreen({ navigation }) {
  const { email } = useContext(AuthContext);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [images, setImages] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      multiple: true,
      maxSelectedAssets: 4 - images.length,
    });

    if (!result.cancelled) {
      const selectedImages = result.assets.map(asset => asset.uri);
      setImages([...images, ...selectedImages]);
    }
  };

  const postItem = async () => {
    if (!itemName || !itemDescription || images.length === 0) {
      setShowErrorMessage(true);
      setErrorMessage('Please fill all fields and add at least one image.');
      setTimeout(() => {
        setShowErrorMessage(false);
        setErrorMessage('');
      }, 3000);
      return;
    }

    try {
      const newItem = {
        id: Date.now().toString(),
        name: itemName,
        description: itemDescription,
        images,
        owner: email
      };

      const storedItems = await AsyncStorage.getItem('items');
      const items = storedItems ? JSON.parse(storedItems) : [];
      items.push(newItem);
      await AsyncStorage.setItem('items', JSON.stringify(items));

      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000); // Hide message after 3 seconds

      // Clear input fields
      setItemName('');
      setItemDescription('');
      setImages([]);

      // Navigate to another screen
      navigation.navigate('ViewItemsScreen');

    } catch (error) {
      console.error('Error posting item:', error);
      setShowErrorMessage(true);
      setErrorMessage('Failed to post item. Please try again.');
      setTimeout(() => {
        setShowErrorMessage(false);
        setErrorMessage('');
      }, 3000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emailText}>Logged in: {email}</Text>
      <Text style={styles.header}>Giveaway an item</Text>
      
      {showSuccessMessage && (
        <View style={styles.successMessage}>
          <Text style={styles.successMessageText}>Item posted successfully!</Text>
        </View>
      )}

      {showErrorMessage && (
        <View style={styles.errorMessage}>
          <Text style={styles.errorMessageText}>{errorMessage}</Text>
        </View>
      )}

      <View style={styles.imagePickerContainer}>
        {images.map((imageUri, index) => (
          <Image key={index} source={{ uri: imageUri }} style={styles.image} />
        ))}
        {images.length < 2 && (
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <Text style={styles.imageText}>Add Pictures</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={itemName}
        onChangeText={setItemName}
      />
      
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Description"
        value={itemDescription}
        onChangeText={setItemDescription}
        multiline
      />
      
      <TouchableOpacity style={styles.buttonWrapper} onPress={postItem}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  emailText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1E88E5',
  },
  imagePickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  imagePicker: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: '#1E88E5',
    borderStyle: 'dashed',
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  imageText: {
    color: '#1E88E5',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  buttonWrapper: {
    marginBottom: 20,
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    padding: 10,
  },
  successMessage: {
    backgroundColor: 'rgba(0, 255, 0, 0.8)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  successMessageText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorMessage: {
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorMessageText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PostItemScreen;
