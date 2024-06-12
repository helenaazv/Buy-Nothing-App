import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';

function PostItemScreen() {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = () => {
    // Placeholder function for image picking
    alert('Image picker functionality goes here');
  };

  const postItem = () => {
    console.log('Item Posted:', itemName, itemDescription);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Giveaway an item</Text>
      
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imageText}>Add Pictures</Text>
        )}
      </TouchableOpacity>
      
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
      
      <Button title="Post" onPress={postItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1E88E5',
  },
  imagePicker: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    borderWidth: 1,
    borderColor: '#1E88E5',
    borderStyle: 'dashed',
    borderRadius: 10,
    marginBottom: 20,
  },
  imageText: {
    color: '#1E88E5',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
});

export default PostItemScreen;
