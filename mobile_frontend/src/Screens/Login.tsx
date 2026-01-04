import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { login, User } from "../Services/api";

export default function LoginScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#0f172a", // dark blue background
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 16,
    },

    appTitle: {
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 24,
      color: "#e5e7eb",
    },

    card: {
      width: "100%",
      maxWidth: 380,
      backgroundColor: "#020617",
      padding: 24,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "#1e293b",
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 6,
    },

    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      color: "#f9fafb",
      marginBottom: 4,
    },

    subtitle: {
      textAlign: "center",
      color: "#9ca3af",
      marginBottom: 24,
    },

    input: {
      borderWidth: 1,
      borderColor: "#374151",
      backgroundColor: "#020617",
      color: "#e5e7eb",
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 10,
      marginBottom: 14,
    },

    loginButton: {
      backgroundColor: "#22c55e",
      paddingVertical: 14,
      borderRadius: 999,
      marginTop: 12,
      alignItems: "center",
    },

    loginButtonText: {
      color: "#020617",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 16,
    },

    forgotText: {
      textAlign: "center",
      color: "#22c55e",
      marginTop: 16,
    },

    divider: {
      height: 1,
      backgroundColor: "#1f2937",
      marginVertical: 24,
    },

    signupText: {
      textAlign: "center",
      color: "#9ca3af",
    },

    signupLink: {
      color: "#22c55e",
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>FarmInvest</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Welcome back 👋</Text>

        <TextInput
          placeholder="Username"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        {error && (
          <Text style={{ color: "red", marginBottom: 8, textAlign: "center" }}>
            {error}
          </Text>
        )}

        <TouchableOpacity
          style={styles.loginButton}
          onPress={async () => {
            if (!name || !password) {
              setError("Please enter username and password.");
              return;
            }

            try {
              setLoading(true);
              setError(null);
              const user: User = await login(name, password);
              navigation.replace("Investments", { user });
            } catch (e: any) {
              setError(e?.message || "Login failed. Please try again.");
            } finally {
              setLoading(false);
            }
          }}
        >
          <Text style={styles.loginButtonText}>
            {loading ? "Signing in..." : "Continue"}
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
