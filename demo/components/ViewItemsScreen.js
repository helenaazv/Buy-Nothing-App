import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function ViewItemsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([
    { id: 1, name: 'Bike', location: 'Village C', image: 'https://media.cnn.com/api/v1/images/stellar/prod/230419133455-velotric-thunder-1-ebike-lead-cnnu.jpg?c=original', owner: 'John Doe' },
    { id: 2, name: 'Lava Lamp', location: 'East', image: 'https://i.ebayimg.com/images/g/7oMAAOSw26dkBnLi/s-l400.jpg', owner: 'Jane Smith' },
    { id: 3, name: 'Forever 21 Dress', location: 'Mods', image: 'https://i.ebayimg.com/images/g/oWYAAOSwgJFkK5uv/s-l1200.webp', owner: 'Alice Johnson' },
    { id: 4, name: 'Microwave', location: 'Ziv', image: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Panasonic_NN-SD69LS_20220410.jpg', owner: 'Bob Brown' },
    { id: 5, name: 'Mini Fridge', location: 'Massell', image: 'https://i.ebayimg.com/images/g/U4wAAOSwlPliXY4G/s-l1200.webp', owner: 'Carol Green' },
    { id: 6, name: 'Brandeis Hoodie', location: 'Village A', image: 'https://bkstr.scene7.com/is/image/Bkstr/1391-CS2071-P1474928-Navy?$HomePageRecs_ET$', owner: 'David White' },
    { id: 7, name: 'Bedding', location: 'Village B', image: 'https://i.ebayimg.com/images/g/zXwAAOSw~1xi7nUg/s-l400.jpg', owner: 'Emma Black' },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemOwner}>Owner: {item.owner}</Text>
        <Text style={styles.itemLocation}>Location: {item.location}</Text>
        <TouchableOpacity style={styles.messageButton}>
          <Text style={styles.messageButtonText}>Message Owner</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
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
    width: 100,
    height: 100,
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
  itemLocation: {
    fontSize: 14,
    color: '#888',
  },
  messageButton: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  messageButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

