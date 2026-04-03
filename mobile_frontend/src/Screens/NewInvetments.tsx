import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Alert 
} from "react-native";
import { createInvestment, Investment, User } from "../Services/api";
import FarmInvestLogo from "../components/FarmInvestLogo";

export default function NewInvestmentScreen({ navigation, route }: any) {
  const onAdd = route?.params?.onAdd;
  const user: User | undefined = route?.params?.user;

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

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const saved = await createInvestment({
        user_id: user?.id,
        farmer_name: farmer,
        crop,
        amount: numAmount,
      });

      if (onAdd) {
        onAdd(saved);
      }

      // Show success message and navigate back
      Alert.alert(
        "Investment Created!",
        `Successfully invested Rs ${numAmount.toLocaleString('en-IN')} in ${farmer}'s ${crop} farm.`,
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (err) {
      setError("Failed to save investment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#0f172a",
    },
    safeArea: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 50,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 40,
      paddingHorizontal: 4,
    },
    logoContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    logoText: {
      color: "#f8fafc",
      fontSize: 20,
      fontWeight: "bold",
      marginLeft: 8,
    },
    notificationIcon: {
      backgroundColor: "#1e293b",
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    notificationText: {
      color: "#94a3b8",
      fontSize: 18,
    },
    titleContainer: {
      alignItems: "center",
      marginBottom: 50,
    },
    title: {
      color: "#f8fafc",
      fontSize: 28,
      fontWeight: "600",
    },
    formContainer: {
      marginBottom: 40,
    },
    fieldContainer: {
      marginBottom: 24,
    },
    label: {
      color: "#94a3b8",
      fontSize: 12,
      fontWeight: "600",
      letterSpacing: 1.2,
      textTransform: "uppercase",
      marginBottom: 8,
      paddingHorizontal: 4,
    },
    input: {
      backgroundColor: "#1e293b",
      borderRadius: 25,
      paddingHorizontal: 20,
      paddingVertical: 16,
      color: "#f8fafc",
      fontSize: 16,
      borderWidth: 1,
      borderColor: "#334155",
    },
    inputPlaceholder: {
      color: "#64748b",
    },
    farmCardContainer: {
      marginBottom: 40,
    },
    farmCard: {
      backgroundColor: "#1e293b",
      borderRadius: 16,
      overflow: "hidden",
      height: 160,
      position: "relative",
    },
    farmImageOverlay: {
      flex: 1,
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      justifyContent: "flex-end",
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    farmImageBackground: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "#059669",
      opacity: 0.3,
    },
    verifiedContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(34, 197, 94, 0.95)",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      alignSelf: "flex-start",
    },
    verifiedIcon: {
      color: "white",
      fontSize: 14,
      marginRight: 6,
    },
    verifiedText: {
      color: "white",
      fontSize: 12,
      fontWeight: "600",
      letterSpacing: 0.5,
    },
    actionContainer: {
      marginBottom: 30,
    },
    saveButton: {
      backgroundColor: "#22c55e",
      paddingVertical: 18,
      borderRadius: 12,
      alignItems: "center",
      marginBottom: 20,
    },
    saveButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "600",
    },
    saveButtonDisabled: {
      backgroundColor: "#374151",
    },
    saveButtonTextDisabled: {
      color: "#9ca3af",
    },
    cancelContainer: {
      alignItems: "center",
    },
    cancelButton: {
      flexDirection: "row",
      alignItems: "center",
    },
    cancelIcon: {
      color: "#94a3b8",
      fontSize: 16,
      marginRight: 6,
    },
    cancelText: {
      color: "#94a3b8",
      fontSize: 16,
    },
    disclaimerContainer: {
      paddingHorizontal: 4,
      marginBottom: 20,
    },
    disclaimerText: {
      color: "#64748b",
      fontSize: 12,
      textAlign: "center",
      lineHeight: 18,
    },
    errorContainer: {
      backgroundColor: "#ef4444",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
      marginBottom: 20,
      marginHorizontal: 4,
    },
    errorText: {
      color: "white",
      fontSize: 14,
      textAlign: "center",
    },
    emptyStateContainer: {
      flex: 1,
      backgroundColor: "#0f172a",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 24,
    },
    emptyStateText: {
      color: "#f8fafc",
      textAlign: "center",
      marginBottom: 16,
      fontSize: 16,
    },
    emptyStateButton: {
      backgroundColor: "#22c55e",
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 12,
    },
    emptyStateButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "600",
    },
  });

  // If onAdd not provided, show error state
  if (!onAdd) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateText}>
          Warning: Navigation callback not provided
        </Text>
        <TouchableOpacity
          style={styles.emptyStateButton}
          onPress={() => navigation.replace("Investments")}
        >
          <Text style={styles.emptyStateButtonText}>Go to Investments</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.safeArea} showsVerticalScrollIndicator={false}>
        {/* Header with Logo and Notification */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <FarmInvestLogo size={28} />
            <Text style={styles.logoText}>FarmInvest</Text>
          </View>
          <View style={styles.notificationIcon}>
            <Text style={styles.notificationText}>🔔</Text>
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>New Investment</Text>
        </View>

        {/* Error Message */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>FARMER NAME</Text>
            <TextInput
              placeholder="Enter farmer full name"
              placeholderTextColor="#64748b"
              value={farmer}
              onChangeText={setFarmer}
              style={styles.input}
              editable={!loading}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>CROP</Text>
            <TextInput
              placeholder="e.g. Organic Soybeans"
              placeholderTextColor="#64748b"
              value={crop}
              onChangeText={setCrop}
              style={styles.input}
              editable={!loading}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>AMOUNT ($)</Text>
            <TextInput
              placeholder="0.00"
              placeholderTextColor="#64748b"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={styles.input}
              editable={!loading}
            />
          </View>
        </View>

        {/* Verified Farm Card */}
        <View style={styles.farmCardContainer}>
          <View style={styles.farmCard}>
            <View style={styles.farmImageBackground} />
            <View style={styles.farmImageOverlay}>
              <View style={styles.verifiedContainer}>
                <Text style={styles.verifiedIcon}>✓</Text>
                <Text style={styles.verifiedText}>VERIFIED SUSTAINABLE FARM</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[
              styles.saveButton,
              loading && styles.saveButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={[
              styles.saveButtonText,
              loading && styles.saveButtonTextDisabled
            ]}>
              {loading ? "Saving..." : "Save"}
            </Text>
          </TouchableOpacity>

          <View style={styles.cancelContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
              disabled={loading}
            >
              <Text style={styles.cancelIcon}>←</Text>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>
            By submitting this form, you acknowledge that{'\n'}
            investments in agriculture carry risks. FarmInvest{'\n'}
            ensures 100% transparency in asset allocation.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}


