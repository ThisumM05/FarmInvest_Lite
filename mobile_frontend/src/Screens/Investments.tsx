// src/screens/InvestmentScreen.tsx
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Button,
} from "react-native";
import { getInvestments, Investment } from "../Services/api";

export default function InvestmentScreen({ navigation }: any) {
  const [data, setData] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      setError(null);
      const items = await getInvestments();
      setData(items);
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

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;
  if (error) return <Text style={{ color: "red", padding: 12 }}>{error}</Text>;

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Back to Login"
        onPress={() => navigation.replace("Login")}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View
            style={{ padding: 12, borderBottomWidth: 1, borderColor: "#eee" }}
          >
            <Text style={{ fontWeight: "600" }}>
              {item.farmer_name} — {item.crop}
            </Text>
            <Text>Rs {Number(item.amount).toFixed(2)}</Text>
            <Text>{new Date(item.created_at).toLocaleDateString()}</Text>
            <Button
              title="Create New Investment"
              onPress={() => navigation.replace("NewInvestments")}
            />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={{ padding: 12 }}>No investments yet.</Text>
          
        }
      />
       <Button
              title="Create New Investment"
              onPress={() => navigation.replace("NewInvestments")}
            />
    </View>
  );
}
