import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import React, { useState, useMemo } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  onBack: () => void;
  onNext: () => void;
  onSelectYear?: (year: number) => void;
  disabledFromYear?: number; // years >= this will be disabled
  initialYear?: number; // optional, to scroll to a specific year
  yearsPerPage?: number; // optional, default 12
};

const START_YEAR = 1970;
const END_YEAR = 2101;

const Year: React.FC<Props> = ({
  onBack,
  onNext,
  onSelectYear,
  disabledFromYear,
  initialYear,
  yearsPerPage = 12,
}) => {
  const totalYears = END_YEAR - START_YEAR;

  const totalPages = Math.ceil(totalYears / yearsPerPage);

  const initialPage = initialYear
    ? Math.floor((initialYear - START_YEAR) / yearsPerPage)
    : totalPages;

  const [page, setPage] = useState(initialPage);

  const years = useMemo(() => {
    const start = START_YEAR + page * yearsPerPage;
    const end = Math.min(start + yearsPerPage - 1, END_YEAR);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [page, yearsPerPage]);

  const handlePrev = () => setPage((p) => Math.max(0, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <View>
      <Text style={styles.title}>Select Year</Text>
      <View style={styles.arrowRow}>
        <Pressable onPress={handlePrev} disabled={page === 0} style={styles.arrowButton}>
          <Ionicons name="chevron-back" size={24} color={page === 0 ? "#ccc" : "#222"} />
        </Pressable>
        <Text style={styles.rangeText}>
          {years[0]} - {years[years.length - 1]}
        </Text>
        <Pressable
          onPress={handleNext}
          disabled={page === totalPages - 1}
          style={styles.arrowButton}
        >
          <Ionicons
            name="chevron-forward"
            size={24}
            color={page === totalPages - 1 ? "#ccc" : "#222"}
          />
        </Pressable>
      </View>
      <FlatList
        data={years}
        keyExtractor={(item) => item.toString()}
        numColumns={4}
        contentContainerStyle={styles.yearsGrid}
        renderItem={({ item }) => {
          const disabled = disabledFromYear !== undefined && item >= disabledFromYear;
          return (
            <Pressable
              style={[styles.yearButton, disabled && styles.yearButtonDisabled]}
              onPress={() => !disabled && onSelectYear?.(item)}
              disabled={disabled}
            >
              <Text style={[styles.yearText, disabled && styles.yearTextDisabled]}>
                {item}
              </Text>
            </Pressable>
          );
        }}
      />
      <View style={styles.footerRow}>
        <Pressable onPress={onBack} style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable onPress={onNext} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Year;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 16,
  },
  arrowRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    gap: 12,
  },
  arrowButton: {
    padding: 8,
  },
  rangeText: {
    fontSize: 16,
    fontWeight: "500",
    minWidth: 90,
    textAlign: "center",
  },
  yearsGrid: {
    alignItems: "center",
    marginBottom: 24,
  },
  yearButton: {
    backgroundColor: "#ececec",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    margin: 6,
    minWidth: 60,
    alignItems: "center",
  },
  yearButtonDisabled: {
    backgroundColor: "#f5f5f5",
  },
  yearText: {
    fontSize: 16,
    color: "#222",
  },
  yearTextDisabled: {
    color: "#aaa",
  },
  footerRow: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#ececec",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    gap: 8,
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
  },
});
