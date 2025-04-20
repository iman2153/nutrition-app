import React, { useState } from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  View,
  TextInput
} from 'react-native';
const Cerebras = require('@cerebras/cerebras_cloud_sdk');
import { ThemedText } from 'ThemedText';
import { ThemedView } from 'ThemedView';

export const ChatInterface = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState('');

  const makeRequest = async () => {
    if (!userInput.trim()) return;
    
    setIsLoading(true);
    setResponse(null);

    try {
      // Initialize Cerebras client
      const client = new Cerebras({
        apiKey: "csk-3mf3enyt8cw2ew5cyndkcm6pp9rrdk5fvw6d59ktw8dwmmfr"
      });
      
      // Create a system prompt that guides the model to suggest food options
      const systemPrompt = `You are a helpful food recommendation assistant. 
Your goal is to suggest personalized meal options based on the user's preferences, dietary restrictions, and mood.
When suggesting meals:
1. Consider any dietary restrictions or preferences mentioned
2. Suggest options that might improve the user's mood if they mention feeling a certain way
3. Provide 3-5 specific meal suggestions with brief descriptions
4. Include a mix of meal types (breakfast, lunch, dinner, snacks) when appropriate
5. If the user doesn't mention specific preferences, ask clarifying questions`;
      
      const completionResponse = await client.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userInput }
        ],
        model: 'llama-4-scout-17b-16e-instruct',
        temperature: 0.7, // Add some creativity but keep responses focused
        max_tokens: 500, // Ensure responses aren't too lengthy
      });

      // Extract and display the response
      if (completionResponse.choices && completionResponse.choices.length > 0) {
        setResponse(completionResponse.choices[0].message.content);
      } else {
        setResponse('No response received.');
      }
    } catch (error) {
      console.error('Error calling Cerebras API:', error);
      setResponse('Sorry, I encountered an error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Tell me your food preferences or mood..."
          placeholderTextColor="#999"
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={makeRequest}
          disabled={isLoading || !userInput.trim()}
        >
          <ThemedText style={styles.buttonText}>
            {isLoading ? 'Sending...' : 'Send'}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
      
      {isLoading && (
        <ThemedView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </ThemedView>
      )}
      
      {response && (
        <ThemedView style={styles.responseContainer}>
          <ThemedText style={styles.responseTitle}>Suggested Meals:</ThemedText>
          <ThemedText style={styles.responseText}>{response}</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 16,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    minHeight: 50,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 8,
    height: 50,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
    marginVertical: 20,
  },
  responseContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginTop: 16,
  },
  responseTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },
  responseText: {
    lineHeight: 22,
  }
});
