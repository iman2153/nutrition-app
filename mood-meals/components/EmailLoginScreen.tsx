import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { supabase } from '@/supabase';
import { EmailLoginStyles as styles } from './styles/EmailLoginStyles';

const EmailLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Login error:', error.message);
    } else {
      console.log('Login successful');
      // Redirect or navigate to home screen
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Moo’dMeal</Text>

      <Image
        source={require('@/assets/moodmeal-bowl.png')}
        style={styles.image}
      />

      <View style={styles.inputContainer}>
        <AntDesign name="mail" size={20} color="#3B2D4D" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="mood@gmail.com"
          placeholderTextColor="#3B2D4D"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="key" size={20} color="#3B2D4D" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#3B2D4D"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity onPress={handleEmailLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.forgotPassword}>
        Forgot password? <Text style={styles.clickHere}>Click here</Text>
      </Text>
    </View>
  );
};

export default EmailLoginScreen;
