// src/screens/LoginScreen.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function LoginScreen({ navigation }: any) {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Welcome to FarmInvest Lite</Text>
      <Button title="Continue" onPress={() => navigation.replace('Investments')} />
    </View>
  );
}
