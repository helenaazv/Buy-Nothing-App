import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const messages = [
  {
    id: '1',
    name: 'Clara',
    message: 'Hi Lila, I’m going to be arriving in 30 minutes',
    item: 'Yellow Lamp',
    avatar: 'https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small/beautiful-latin-woman-avatar-character-icon-free-vector.jpg',
  },
  {
    id: '2',
    name: 'Helena',
    message: 'When can I pick up the Airfryer?',
    item: 'Airfryer',
    avatar: 'https://img.freepik.com/vector-premium/ilustracion-plana-vector-avatar-mujer-avatar-mujer-joven-sonriente_469123-477.jpg',
  },
  {
    id: '3',
    name: 'Sabrina',
    message: 'The blender is working perfectly, thank you!',
    item: 'Blender',
    avatar: 'https://static.vecteezy.com/system/resources/previews/010/967/114/non_2x/avatar-young-female-free-vector.jpg',
  },
  {
    id: '4',
    name: 'Laura',
    message: 'I hope you are enjoying the bike. I am glad its being used!',
    item: 'Bike',
    avatar: 'https://static.vecteezy.com/ti/vetor-gratis/p1/5026528-vector-illustration-female-avatar-in-flat-style-gratis-vetor.jpg',
  },
];

function MessagesScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.status}>{item.status}{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.messageText}>{item.message}</Text>
        <Text style={styles.messageDate}>{item.date}</Text>
        <Text style={styles.messageItem}>{item.item}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
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
