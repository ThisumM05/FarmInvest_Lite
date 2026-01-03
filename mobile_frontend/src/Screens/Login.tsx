import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function LoginScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f2f2f2",
      justifyContent: "center",
      alignItems: "center",
    },

    appTitle: {
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 20,
    },

    card: {
      width: "90%",
      backgroundColor: "#fff",
      padding: 24,
      borderRadius: 12,
      elevation: 4, 
    },

    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
    },

    subtitle: {
      textAlign: "center",
      color: "#666",
      marginBottom: 20,
    },

    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
    },

    loginButton: {
      backgroundColor: "#0066ff",
      padding: 14,
      borderRadius: 8,
      marginTop: 10,
    },

    loginButtonText: {
      color: "#fff",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 16,
    },

    forgotText: {
      textAlign: "center",
      color: "#0066ff",
      marginTop: 12,
    },

    divider: {
      height: 1,
      backgroundColor: "#ddd",
      marginVertical: 20,
    },

    signupText: {
      textAlign: "center",
      color: "#555",
    },

    signupLink: {
      color: "#0066ff",
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>MyApp</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Welcome back 👋</Text>

        <TextInput
          placeholder="Username"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.loginButton}>
          <Text
            style={styles.loginButtonText}
            onPress={() => navigation.replace("Investments")}
          >
            Continue
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <Text style={styles.signupText}>
          Don' have an account? <Text style={styles.signupLink}>Sign up</Text>
        </Text>
      </View>
    </View>
  );
}
