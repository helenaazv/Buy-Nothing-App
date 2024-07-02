import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, Alert, ScrollView, Modal } from 'react-native';
import { AuthContext } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ViewItemsScreen() {
  const { email } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]); // State to hold selected item's images
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Track the index of the selected image

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('items');
        const items = storedItems ? JSON.parse(storedItems) : [];
        setItems(items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, []);

  const removeItem = async (itemId) => {
    try {
      const updatedItems = items.filter(item => item.id !== itemId);
      setItems(updatedItems);
      await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
      Alert.alert('Success', 'Item removed successfully!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to remove item. Please try again.');
    }
  };

  const messageOwner = (owner) => {
    Alert.alert('Message Owner', `Message sent to ${owner}!`);
  };

  const openModal = (item) => {
    setSelectedImages(item.images); // Set selectedImages to the array of images for the selected item
    setModalVisible(true);
    setSelectedImageIndex(0); // Reset selectedImageIndex to start from the first image
  };

  const nextImage = () => {
    const newIndex = (selectedImageIndex + 1) % selectedImages.length;
    setSelectedImageIndex(newIndex);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => openModal(item)}>
        <Image source={{ uri: item.images[0] }} style={styles.itemImage} />
      </TouchableOpacity>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemOwner}>Owner: {item.owner}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.messageButton} onPress={() => messageOwner(item.owner)}>
            <Text style={styles.messageButtonText}>Message Owner</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.id)}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.emailText}>Logged in: {email}</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView>
        <FlatList
          data={items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </ScrollView>

      {/* Modal for displaying image */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forwardButton} onPress={nextImage}>
            <Text style={styles.forwardButtonText}>{'>'}</Text>
          </TouchableOpacity>
          <Image source={{ uri: selectedImages[selectedImageIndex] }} style={styles.modalImage} resizeMode="contain" />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  emailText: {
    fontSize: 16,
    color: '#888',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemImage: {
    width: 120,
    height: 120,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemOwner: {
    fontSize: 16,
    color: '#555',
  },
  itemDescription: {
    fontSize: 14,
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  messageButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  messageButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  removeButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalImage: {
    width: '80%',
    height: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
  forwardButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  forwardButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
});
