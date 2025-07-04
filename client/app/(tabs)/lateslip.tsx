import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { getMyLateSlips } from "@/services/lateSlipServices";
import Header from "@/components/Header";
import { FontAwesome5 } from "@expo/vector-icons";

const Lateslip = () => {
  const [slips, setSlips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlips = async () => {
      try {
        setLoading(true);
        const response = await getMyLateSlips();
        if (response.success) {
          setSlips(response.lateSlips || []);
        }
      } catch (error) {
        console.error("Error fetching slips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlips();
  }, []);

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    return s === "approved" ? "green" : s === "rejected" ? "red" : "black";
  };

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const renderSlip = ({ item }: { item: any }) => (
    <View style={styles.slipItem}>
      <FontAwesome5 name="file-alt" size={32} color="#74C044" />
      <View style={styles.slipDetails}>
        <Text style={styles.reason}>Reason: {item.reason}</Text>
        <Text style={styles.date}>{formatDateTime(item.created_at)}</Text>
        <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
          Status: {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.heading}>Your Late Slips</Text>

        {loading ? (
          <ActivityIndicator size="small" color="#74C044" />
        ) : slips.length === 0 ? (
          <Text style={styles.noData}>No Records For Late Slips.</Text>
        ) : (
          <FlatList
            data={slips}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderSlip}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </View>
  );
};

export default Lateslip;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  slipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    gap: 12,
  },
  slipDetails: {
    flex: 1,
  },
  reason: {
    color: "#333",
    fontSize: 14,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "gray",
    marginBottom: 2,
  },
  status: {
    fontSize: 12,
    fontWeight: "bold",
  },
  noData: {
    marginTop: 10,
    color: "#555",
    textAlign: "center",
  },
  listContent: {
    paddingVertical: 10,
  },
});
