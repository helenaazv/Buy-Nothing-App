import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim() === '') {
      return;
    }
    const updatedMessages = [...messages, { text: newMessage, sender: 'Me'}];
    setMessages(updatedMessages);
    setNewMessage('');
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>{item.sender}: {item.text}</Text>
            <Text style={{ fontSize: 10 }}>{item.time}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1 }} // Ensure FlatList grows with content
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <TextInput
          style={{ flex: 1, height: 40, borderWidth: 1, borderRadius: 20, paddingHorizontal: 15 }}
          value={newMessage}
          onChangeText={text => setNewMessage(text)}
          placeholder="Type your message..."
          keyboardType="default" // Set keyboard type (default, numeric, email, etc.)
          autoCapitalize="sentences" // Auto-capitalization (sentences, words, none)
          returnKeyType="send" // Return key type (send, done, etc.)
          onSubmitEditing={handleSend} // Handle submit action
        />
        <TouchableOpacity style={{ marginLeft: 10, backgroundColor: '#0084FF', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 15 }}
          onPress={handleSend}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
