import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { login, User } from "../Services/api";
import FarmInvestLogo from "../components/FarmInvestLogo";

export default function LoginScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      {/* Logo row */}
      <View style={styles.logoRow}>
        <FarmInvestLogo size={44} />
        <Text style={styles.appTitle}>FarmInvest</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Welcome back 👋</Text>

        {/* Username */}
        <Text style={styles.inputLabel}>USERNAME</Text>
        <View style={styles.inputWrapper}>
          <Feather name="user" size={16} color="#6b7280" style={styles.fieldIcon} />
          <TextInput
            placeholder="Enter your username"
            placeholderTextColor="#4b5563"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        {/* Password */}
        <Text style={styles.inputLabel}>PASSWORD</Text>
        <View style={styles.inputWrapper}>
          <Feather name="lock" size={16} color="#6b7280" style={styles.fieldIcon} />
          <TextInput
            placeholder="••••••••"
            placeholderTextColor="#4b5563"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            style={styles.eyeButton}
          >
            <Feather name={showPassword ? "eye" : "eye-off"} size={16} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        <TouchableOpacity
          style={styles.loginButton}
          activeOpacity={0.85}
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
          Don't have an account?{" "}
          <Text style={styles.signupLink}>Sign up</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    gap: 12,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#f9fafb",
    letterSpacing: 0.5,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#0d1b2a",
    padding: 28,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#1e293b",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#f9fafb",
    marginBottom: 4,
  },
  subtitle: {
    textAlign: "center",
    color: "#9ca3af",
    fontSize: 14,
    marginBottom: 28,
  },
  inputLabel: {
    color: "#6b7280",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    marginBottom: 8,
    marginLeft: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#162032",
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginBottom: 20,
  },
  fieldIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#e5e7eb",
    fontSize: 14,
    padding: 0,
  },
  eyeButton: {
    paddingLeft: 8,
  },
  errorText: {
    color: "#ef4444",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: "#22c55e",
    paddingVertical: 16,
    borderRadius: 999,
    marginTop: 4,
    marginBottom: 4,
    alignItems: "center",
    shadowColor: "#22c55e",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  loginButtonText: {
    color: "#020617",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.3,
  },
  forgotText: {
    textAlign: "center",
    color: "#22c55e",
    marginTop: 18,
    fontWeight: "600",
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "#1e293b",
    marginVertical: 24,
  },
  signupText: {
    textAlign: "center",
    color: "#9ca3af",
    fontSize: 14,
  },
  signupLink: {
    color: "#22c55e",
    fontWeight: "bold",
  },
});
