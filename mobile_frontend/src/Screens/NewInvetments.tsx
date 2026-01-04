import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { createInvestment, Investment } from "../Services/api";

export default function NewInvestmentScreen({ navigation, route }: any) {
  // Correct: onAdd is just the function, no destructuring
  const onAdd = route?.params?.onAdd;

  const [farmer, setFarmer] = useState("");
  const [crop, setCrop] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!farmer || !crop || !amount) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    const optimistic: Investment = {
      id: Date.now(),
      farmer_name: farmer,
      crop,
      amount: Number(amount),
      created_at: new Date().toISOString(),
    };

    // Optimistic update (only if onAdd exists)
    if (onAdd) {
      onAdd(optimistic);
    }

    navigation.goBack();

    try {
      const saved = await createInvestment({
        farmer_name: farmer,
        crop,
        amount: Number(amount),
      });

      if (onAdd) {
        onAdd(saved);
      }
    } catch {
      setError("Failed to save investment.");
    } finally {
      setLoading(false);
    }
  };

  // If onAdd not provided, show a simple error message but screen still renders
  if (!onAdd) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red", textAlign: "center" }}>
          Warning: onAdd callback not provided
        </Text>
        <Button title="Go Back" onPress={() => navigation.replace("Investments")} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Investment</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        placeholder="Farmer Name"
        value={farmer}
        onChangeText={setFarmer}
        style={styles.input}
      />

      <TextInput
        placeholder="Crop"
        value={crop}
        onChangeText={setCrop}
        style={styles.input}
      />

      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button
        title={loading ? "Saving..." : "Save"}
        onPress={handleSubmit}
        disabled={loading}
      />

      <Button
        title="Cancel"
        onPress={() => navigation.goBack()}
        color="gray"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
