import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert
} from "react-native";
import FarmInvestLogo from "../components/FarmInvestLogo";

// Mock farmer data - In a real app, this would come from an API
interface Farmer {
  id: number;
  name: string;
  location: string;
  crop: string;
  status: 'ACTIVE' | 'PENDING REVIEW' | 'INACTIVE';
  avatar: string;
}

const mockFarmers: Farmer[] = [
  {
    id: 1,
    name: "Silas Thorne",
    location: "Central Highlands",
    crop: "ORGANIC SOY",
    status: "ACTIVE",
    avatar: "ST"
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    location: "River Valley",
    crop: "WHEAT",
    status: "ACTIVE",
    avatar: "ER"
  },
  {
    id: 3,
    name: "Marcus Aurelius",
    location: "Northern Plains",
    crop: "CORN STALKS",
    status: "PENDING REVIEW",
    avatar: "MA"
  },
  {
    id: 4,
    name: "Ji-Soo Kim",
    location: "Eastern Slopes",
    crop: "BERRIES",
    status: "ACTIVE",
    avatar: "JK"
  }
];

export default function FarmersScreen({ navigation, route }: any) {
  const [farmers, setFarmers] = useState<Farmer[]>(mockFarmers);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFarmers, setFilteredFarmers] = useState<Farmer[]>(mockFarmers);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Filter farmers based on search query
    if (searchQuery.trim() === "") {
      setFilteredFarmers(farmers);
    } else {
      const filtered = farmers.filter(
        farmer =>
          farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          farmer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          farmer.crop.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFarmers(filtered);
    }
  }, [searchQuery, farmers]);

  const getAvatarColor = (name: string) => {
    const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
    const colorIndex = name.length % colors.length;
    return colors[colorIndex];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return '#22c55e';
      case 'PENDING REVIEW':
        return '#f59e0b';
      case 'INACTIVE':
        return '#ef4444';
      default:
        return '#64748b';
    }
  };

  const getCropColor = (crop: string) => {
    switch (crop) {
      case 'ORGANIC SOY':
        return '#22c55e';
      case 'WHEAT':
        return '#f59e0b';
      case 'CORN STALKS':
        return '#3b82f6';
      case 'BERRIES':
        return '#8b5cf6';
      default:
        return '#64748b';
    }
  };

  const handleAddFarmer = () => {
    Alert.alert("Add Farmer", "This would open the add farmer form");
  };

  const handleEditFarmer = (farmer: Farmer) => {
    Alert.alert("Edit Farmer", `Edit ${farmer.name}`);
  };

  const handleDeleteFarmer = (farmer: Farmer) => {
    Alert.alert(
      "Delete Farmer",
      `Are you sure you want to remove ${farmer.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedFarmers = farmers.filter(f => f.id !== farmer.id);
            setFarmers(updatedFarmers);
          }
        }
      ]
    );
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const renderFarmerItem = ({ item }: { item: Farmer }) => (
    <View style={styles.farmerCard}>
      <View style={styles.farmerInfo}>
        <View style={[styles.avatar, { backgroundColor: getAvatarColor(item.name) }]}>
          <Text style={styles.avatarText}>{item.avatar}</Text>
        </View>
        
        <View style={styles.farmerDetails}>
          <View style={styles.nameRow}>
            <Text style={styles.farmerName}>{item.name}</Text>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status}
            </Text>
          </View>
          
          <View style={styles.locationRow}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          
          <View style={styles.cropTag}>
            <Text style={[styles.cropText, { color: getCropColor(item.crop) }]}>
              {item.crop}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleEditFarmer(item)}
        >
          <Text style={styles.actionIcon}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDeleteFarmer(item)}
        >
          <Text style={styles.actionIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
    headerRight: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
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
    userAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#3b82f6",
      justifyContent: "center",
      alignItems: "center",
    },
    userAvatarText: {
      color: "white",
      fontSize: 14,
      fontWeight: "600",
    },
    titleSection: {
      marginBottom: 24,
      paddingHorizontal: 4,
    },
    title: {
      color: "#f8fafc",
      fontSize: 28,
      fontWeight: "600",
      marginBottom: 4,
    },
    subtitle: {
      color: "#94a3b8",
      fontSize: 15,
    },
    addButton: {
      backgroundColor: "#22c55e",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      borderRadius: 12,
      marginBottom: 20,
    },
    addButtonIcon: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
      marginRight: 6,
    },
    addButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "600",
    },
    searchContainer: {
      marginBottom: 16,
    },
    searchInput: {
      backgroundColor: "#1e293b",
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      color: "#f8fafc",
      fontSize: 16,
      borderWidth: 1,
      borderColor: "#334155",
    },
    filtersContainer: {
      alignItems: "center",
      marginBottom: 24,
    },
    filtersButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#1e293b",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
    filtersIcon: {
      color: "#94a3b8",
      fontSize: 14,
      marginRight: 6,
    },
    filtersText: {
      color: "#94a3b8",
      fontSize: 14,
      fontWeight: "500",
    },
    farmersList: {
      flex: 1,
    },
    farmerCard: {
      backgroundColor: "#1e293b",
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    farmerInfo: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    avatarText: {
      color: "white",
      fontSize: 16,
      fontWeight: "600",
    },
    farmerDetails: {
      flex: 1,
    },
    nameRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 4,
    },
    farmerName: {
      color: "#f8fafc",
      fontSize: 16,
      fontWeight: "600",
      marginRight: 8,
    },
    statusDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginRight: 6,
    },
    statusText: {
      fontSize: 11,
      fontWeight: "500",
      textTransform: "uppercase",
    },
    locationRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    locationIcon: {
      fontSize: 12,
      marginRight: 4,
    },
    locationText: {
      color: "#94a3b8",
      fontSize: 13,
    },
    cropTag: {
      alignSelf: "flex-start",
      backgroundColor: "#1e293b",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: "#334155",
    },
    cropText: {
      fontSize: 11,
      fontWeight: "600",
      textTransform: "uppercase",
    },
    actionButtons: {
      flexDirection: "row",
      gap: 8,
    },
    actionButton: {
      backgroundColor: "#334155",
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
    },
    actionIcon: {
      fontSize: 14,
    },
    paginationContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 4,
    },
    paginationText: {
      color: "#94a3b8",
      fontSize: 14,
    },
    paginationButtons: {
      flexDirection: "row",
      gap: 8,
    },
    paginationButton: {
      backgroundColor: "#1e293b",
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
    },
    paginationButtonText: {
      color: "#94a3b8",
      fontSize: 16,
    },
    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 40,
    },
    emptyStateText: {
      color: "#94a3b8",
      fontSize: 16,
      textAlign: "center",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <FarmInvestLogo size={28} />
            <Text style={styles.logoText}>FarmInvest</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.notificationIcon}>
              <Text style={styles.notificationText}>🔔</Text>
            </View>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>👤</Text>
            </View>
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Farmers</Text>
          <Text style={styles.subtitle}>Manage farmer profiles and harvest metrics</Text>
        </View>

        {/* Add Farmer Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddFarmer}>
          <Text style={styles.addButtonIcon}>+</Text>
          <Text style={styles.addButtonText}>Add Farmer</Text>
        </TouchableOpacity>

        {/* Search */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search farmers, regions, or crops..."
            placeholderTextColor="#64748b"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filters */}
        <View style={styles.filtersContainer}>
          <TouchableOpacity style={styles.filtersButton} onPress={handleToggleFilters}>
            <Text style={styles.filtersIcon}>🔽</Text>
            <Text style={styles.filtersText}>Filters</Text>
          </TouchableOpacity>
        </View>

        {/* Farmers List */}
        <View style={styles.farmersList}>
          <FlatList
            data={filteredFarmers}
            renderItem={renderFarmerItem}
            keyExtractor={(item: Farmer) => String(item.id)}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  {searchQuery ? "No farmers found matching your search" : "No farmers yet"}
                </Text>
              </View>
            }
          />
        </View>

        {/* Pagination */}
        <View style={styles.paginationContainer}>
          <Text style={styles.paginationText}>Showing {filteredFarmers.length} of 248 farmers</Text>
          <View style={styles.paginationButtons}>
            <TouchableOpacity style={styles.paginationButton}>
              <Text style={styles.paginationButtonText}>‹</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paginationButton}>
              <Text style={styles.paginationButtonText}>›</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}