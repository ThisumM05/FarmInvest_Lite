// src/screens/InvestmentScreen.tsx
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { getInvestments, Investment, User } from "../Services/api";
import FarmInvestLogo from "../components/FarmInvestLogo";

export default function InvestmentScreen({ navigation, route }: any) {
  const user: User | undefined = route?.params?.user;
  const [data, setData] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      setError(null);
      const items = await getInvestments();
      setData(items);
    } catch (e) {
      setError("Failed to load investments.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const handleAdd = (investment: Investment) => {
    setData((prev) => [investment, ...prev]);
  };

  // Calculate portfolio value
  const portfolioValue = data.reduce((sum, item) => sum + Number(item.amount), 0);
  const yieldPercentage = 12.4; // This could be calculated based on historical data

  // Mock avatar function - in real app would fetch from user profile or generate based on name
  const getAvatarUrl = (name: string) => {
    const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
    const initials = name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
    const colorIndex = name.length % colors.length;
    return { initials, backgroundColor: colors[colorIndex] };
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
      marginBottom: 24,
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
    logoutButton: {
      backgroundColor: "#1e293b",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 16,
    },
    logoutText: {
      color: "#94a3b8",
      fontSize: 13,
      fontWeight: "500",
    },
    welcomeSection: {
      marginBottom: 24,
      paddingHorizontal: 4,
    },
    welcomeTitle: {
      color: "#f8fafc",
      fontSize: 24,
      fontWeight: "600",
      marginBottom: 2,
    },
    welcomeSubtitle: {
      color: "#94a3b8",
      fontSize: 15,
    },
    portfolioSection: {
      marginBottom: 32,
      paddingHorizontal: 4,
    },
    portfolioLabel: {
      color: "#94a3b8",
      fontSize: 11,
      fontWeight: "500",
      marginBottom: 6,
      letterSpacing: 1.2,
      textTransform: "uppercase",
    },
    portfolioValue: {
      color: "#22c55e",
      fontSize: 36,
      fontWeight: "bold",
      marginBottom: 8,
    },
    yieldContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    yieldIcon: {
      fontSize: 14,
      marginRight: 4,
    },
    yieldText: {
      color: "#22c55e",
      fontSize: 14,
      fontWeight: "500",
    },
    tableHeader: {
      flexDirection: "row",
      paddingHorizontal: 4,
      paddingVertical: 12,
      backgroundColor: "#0f172a",
      borderBottomWidth: 1,
      borderBottomColor: "#1e293b",
    },
    tableHeaderText: {
      color: "#94a3b8",
      fontSize: 12,
      fontWeight: "600",
      textTransform: "uppercase",
    },
    investmentsList: {
      flex: 1,
    },
    investmentRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 4,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#1e293b",
    },
    farmerCell: {
      flex: 2.2,
      flexDirection: "row",
      alignItems: "center",
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
    },
    avatarText: {
      color: "white",
      fontSize: 12,
      fontWeight: "600",
    },
    farmerName: {
      color: "#f8fafc",
      fontSize: 14,
      fontWeight: "500",
      flex: 1,
    },
    cropCell: {
      flex: 1,
    },
    cellText: {
      color: "#f8fafc",
      fontSize: 14,
    },
    amountCell: {
      flex: 1.2,
      alignItems: "flex-end",
    },
    amountText: {
      color: "#f8fafc",
      fontSize: 14,
      fontWeight: "600",
    },
    dateCell: {
      flex: 0.8,
      alignItems: "flex-end",
    },
    dateText: {
      color: "#94a3b8",
      fontSize: 12,
    },
    createButtonContainer: {
      paddingHorizontal: 4,
      paddingVertical: 16,
      paddingBottom: 24,
    },
    createButton: {
      backgroundColor: "#22c55e",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      borderRadius: 12,
    },
    createButtonText: {
      color: "white",
      fontSize: 15,
      fontWeight: "600",
      marginLeft: 6,
    },
    createButtonIcon: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    emptyText: {
      padding: 20,
      color: "#94a3b8",
      textAlign: "center",
      fontSize: 15,
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
    errorText: {
      color: "#ef4444",
      padding: 20,
      textAlign: "center",
      fontSize: 15,
    },
    loadingContainer: {
      marginTop: 40,
    },
  });

  if (!user) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateText}>No user in session. Please log in again.</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.replace("Login")}
        >
          <Text style={styles.createButtonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.safeArea}>
          <ActivityIndicator style={styles.loadingContainer} size="large" color="#22c55e" />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.safeArea}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.safeArea}>
        {/* Header with Logo and Logout */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <FarmInvestLogo size={28} />
            <Text style={styles.logoText}>FarmInvest</Text>
          </View>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => navigation.replace("Login")}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Your Investments</Text>
          <Text style={styles.welcomeSubtitle}>Welcome, {user.username}</Text>
        </View>

        {/* Portfolio Value Section */}
        <View style={styles.portfolioSection}>
          <Text style={styles.portfolioLabel}>CURRENT PORTFOLIO VALUE</Text>
          <Text style={styles.portfolioValue}>Rs {portfolioValue.toLocaleString('en-IN')}.00</Text>
          <View style={styles.yieldContainer}>
            <Text style={styles.yieldIcon}>📈</Text>
            <Text style={styles.yieldText}>+{yieldPercentage}% yield this season</Text>
          </View>
        </View>

        {/* Investments Table */}
        <View style={styles.investmentsList}>
          <FlatList
            data={data}
            keyExtractor={(item: Investment) => String(item.id)}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, { flex: 2.2 }]}>Farmer</Text>
                <Text style={[styles.tableHeaderText, { flex: 1 }]}>Crop</Text>
                <Text style={[styles.tableHeaderText, { flex: 1.2, textAlign: 'right' }]}>Amount</Text>
                <Text style={[styles.tableHeaderText, { flex: 0.8, textAlign: 'right' }]}>Date</Text>
              </View>
            }
            renderItem={({ item }: { item: Investment }) => {
              const avatar = getAvatarUrl(item.farmer_name);
              return (
                <View style={styles.investmentRow}>
                  <View style={styles.farmerCell}>
                    <View style={[styles.avatar, { backgroundColor: avatar.backgroundColor }]}>
                      <Text style={styles.avatarText}>{avatar.initials}</Text>
                    </View>
                    <Text style={styles.farmerName} numberOfLines={1}>
                      {item.farmer_name}
                    </Text>
                  </View>
                  <View style={styles.cropCell}>
                    <Text style={styles.cellText} numberOfLines={1}>
                      {item.crop}
                    </Text>
                  </View>
                  <View style={styles.amountCell}>
                    <Text style={styles.amountText}>
                      Rs {Number(item.amount).toLocaleString('en-IN', { 
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      })}
                    </Text>
                  </View>
                  <View style={styles.dateCell}>
                    <Text style={styles.dateText}>
                      {new Date(item.created_at).toLocaleDateString('en-GB', { 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </Text>
                  </View>
                </View>
              );
            }}
            refreshControl={
              <RefreshControl 
                refreshing={refreshing} 
                onRefresh={onRefresh}
                tintColor="#22c55e"
              />
            }
            ListEmptyComponent={
              <Text style={styles.emptyText}>No investments yet.</Text>
            }
          />
        </View>

        {/* Create New Investment Button */}
        <View style={styles.createButtonContainer}>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate("NewInvestments", { onAdd: handleAdd, user })}
          >
            <Text style={styles.createButtonIcon}>+</Text>
            <Text style={styles.createButtonText}>Create New Investment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
