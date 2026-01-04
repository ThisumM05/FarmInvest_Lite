// src/screens/InvestmentScreen.tsx
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Button,
  StyleSheet,
} from "react-native";
import { getInvestments, Investment, User } from "../Services/api";

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#0f172a",
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    headerText: {
      color: "#f9fafb",
      fontSize: 22,
      fontWeight: "bold",
    },
    headerSubText: {
      color: "#9ca3af",
      fontSize: 13,
      marginTop: 2,
    },
    backButtonWrapper: {
      marginLeft: 8,
    },
    listContent: {
      paddingBottom: 16,
    },
    tableHeader: {
      flexDirection: "row",
      paddingHorizontal: 4,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: "#1e293b",
    },
    tableHeaderText: {
      color: "#9ca3af",
      fontSize: 12,
      fontWeight: "600",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 4,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#020617",
    },
    cell: {
      flex: 1,
    },
    cellText: {
      color: "#e5e7eb",
      fontSize: 13,
    },
    emptyText: {
      padding: 12,
      color: "#9ca3af",
    },
    footerButtonWrapper: {
      marginTop: 12,
    },
    emptyStateContainer: {
      flex: 1,
      backgroundColor: "#0f172a",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 24,
    },
    emptyStateText: {
      color: "#e5e7eb",
      textAlign: "center",
      marginBottom: 16,
    },
  });

  if (!user) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateText}>No user in session. Please log in again.</Text>
        <Button title="Go to Login" onPress={() => navigation.replace("Login")} />
      </View>
    );
  }

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;
  if (error) return <Text style={{ color: "red", padding: 12 }}>{error}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.headerText}>Your Investments</Text>
          <Text style={styles.headerSubText}>Welcome, {user.username}</Text>
        </View>
        <View style={styles.backButtonWrapper}>
          <Button
            title="Logout"
            onPress={() => navigation.replace("Login")}
          />
        </View>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 2 }]}>Farmer</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Crop</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Amount</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Date</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.cell, styles.cellText, { flex: 2 }]}>
              {item.farmer_name}
            </Text>
            <Text style={[styles.cell, styles.cellText, { flex: 1 }]}>
              {item.crop}
            </Text>
            <Text style={[styles.cell, styles.cellText, { flex: 1 }]}>
              Rs {Number(item.amount).toFixed(2)}
            </Text>
            <Text style={[styles.cell, styles.cellText, { flex: 1 }]}>
              {new Date(item.created_at).toLocaleDateString()}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No investments yet.</Text>
          
        }
      />
      <View style={styles.footerButtonWrapper}>
        <Button
          title="Create New Investment"
          onPress={() => navigation.navigate("NewInvestments", { onAdd: handleAdd, user })}
        />
      </View>
    </View>
  );
}
