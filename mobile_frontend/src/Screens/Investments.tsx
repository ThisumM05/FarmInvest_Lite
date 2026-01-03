// src/screens/InvestmentScreen.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function InvestmentScreen({ navigation }: any) {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18 }}>Investment List Screen (placeholder)</Text>
      <Button title="Back to Login" onPress={() => navigation.replace('Login')} />
    </View>
  );
}
