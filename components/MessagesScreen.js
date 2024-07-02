import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';

const messages = [
  {
    id: '1',
    name: 'Clara',
    item: 'Yellow Lamp',
    avatar: 'https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small/beautiful-latin-woman-avatar-character-icon-free-vector.jpg',
  },
  {
    id: '2',
    name: 'Helena',
    item: 'Airfryer',
    avatar: 'https://img.freepik.com/vector-premium/ilustracion-plana-vector-avatar-mujer-avatar-mujer-joven-sonriente_469123-477.jpg',
  },
  {
    id: '3',
    name: 'Sabrina',
    item: 'Blender',
    avatar: 'https://static.vecteezy.com/system/resources/previews/010/967/114/non_2x/avatar-young-female-free-vector.jpg',
  },
  {
    id: '4',
    name: 'Laura',
    item: 'Bike',
    avatar: 'https://static.vecteezy.com/ti/vetor-gratis/p1/5026528-vector-illustration-female-avatar-in-flat-style-gratis-vetor.jpg',
  },
];

function MessagesScreen() {
  const { email } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleChatPress = (item) => {
    // Navigate to chat screen with the selected person
    navigation.navigate('Chat', { person: item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.messageContainer} onPress={() => handleChatPress(item)}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.status}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text> {/* Assuming you have 'time' in your data */}
        </View>
        <Text style={styles.messageText}>{item.message}</Text>
        <Text style={styles.messageItem}>{item.item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.emailText}>Logged in: {email}</Text>
      <Text style={styles.title}>Inbox</Text>
      <Text style={styles.subtitle}>You have {messages.length} unread messages</Text>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  emailText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  messageText: {
    fontSize: 16,
    marginVertical: 4,
  },
  messageDate: {
    fontSize: 14,
    color: '#888',
  },
  messageItem: {
    fontSize: 14,
    color: '#888',
  },
});

export default MessagesScreen;
