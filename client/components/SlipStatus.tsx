import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { fetchAllLateSlips } from "@/services/lateSlipServices";

// 🟢 TypeScript interface for a late slip
interface LateSlip {
  id: string;
  student_id: string;
  reason: string;
  status: string;
  created_at: string;
  updated_at: string;
  request_id: string;
}

const SlipStatus = () => {
  const [lateSlips, setLateSlips] = useState<LateSlip[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSlips = async () => {
    try {
      const data = await fetchAllLateSlips();
      setLateSlips(data || []);
    } catch (err: any) {
      console.error("Failed to fetch late slips:", err.message || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSlips();
  }, []);

  const renderItem = ({ item }: { item: LateSlip }) => (
    <View style={styles.card}>
      <Text style={styles.reason}>Reason: {item.reason}</Text>
      <Text>Status: {item.status}</Text>
      <Text>
        Requested On: {new Date(item.created_at).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headingText}>Late Slip History</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#74C044" />
      ) : lateSlips.length === 0 ? (
        <Text style={styles.noDataText}>No late slips found.</Text>
      ) : (
        <FlatList
          data={lateSlips}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

export default SlipStatus;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headingText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  reason: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  noDataText: {
    textAlign: "center",
    color: "#888",
    marginTop: 50,
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
});
