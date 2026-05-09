import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "../hooks/useAppTheme";

function ListItem({ item }) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.borderLight },
      ]}
    >
      <Text numberOfLines={1} style={[styles.title, { color: colors.text }]}>
        {item.title}
      </Text>
      <Text numberOfLines={2} style={[styles.body, { color: colors.textSecondary }]}>
        {item.body}
      </Text>
    </View>
  );
}

export default React.memo(ListItem);

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
  },
  title: {
    fontWeight: "700",
    marginBottom: 6,
  },
  body: {},
});
