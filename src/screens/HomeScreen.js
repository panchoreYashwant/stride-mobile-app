import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ListItem from "../components/ListItem";
import SearchBar from "../components/SearchBar";
import { useAppTheme } from "../hooks/useAppTheme";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { fetchHomeItems } from "../services/homeService";

export default function HomeScreen() {
  const { colors } = useAppTheme();
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const debouncedQuery = useDebouncedValue(query, 250);

  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    try {
      setError("");
      const data = await fetchHomeItems();
      setItems(data);
    } catch (err) {
      setError(err?.message || "Could not load data.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredItems = useMemo(() => {
    const normalized = debouncedQuery.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item) => {
      const title = String(item.title ?? "").toLowerCase();
      const body = String(item.body ?? "").toLowerCase();
      return title.includes(normalized) || body.includes(normalized);
    });
  }, [items, debouncedQuery]);

  const renderItem = useCallback(({ item }) => <ListItem item={item} />, []);

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SearchBar value={query} onChangeText={setQuery} placeholder="Search posts..." />
      {error ? (
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
      ) : null}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        initialNumToRender={12}
        maxToRenderPerBatch={10}
        windowSize={11}
        removeClippedSubviews
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadData(true)}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: colors.textMuted }]}>
            No matching data found.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    marginBottom: 10,
  },
  emptyText: {
    marginTop: 32,
    textAlign: "center",
  },
});
