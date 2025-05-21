import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import React, { useState, useMemo } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  onBack: () => void;
  updateYear: (year: number) => void;
  disabledFromYear?: number;
  currentDate: XDate;
  yearsPerPage?: number;
};

const START_YEAR = 1970;
const END_YEAR = 2100;

const Year: React.FC<Props> = ({
  onBack,
  updateYear,
  currentDate,
  disabledFromYear,
  yearsPerPage = 12,
}) => {
  const totalYears = END_YEAR - START_YEAR + 1;
  const totalPages = Math.ceil(totalYears / yearsPerPage);
  const currentYear = currentDate.getFullYear();

  const initialPage = currentYear
    ? Math.floor((currentYear - START_YEAR) / yearsPerPage)
    : 0;

  const [page, setPage] = useState(initialPage);

  const years = useMemo(() => {
    const start = START_YEAR + page * yearsPerPage;
    const end = Math.min(start + yearsPerPage - 1, END_YEAR);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [page, yearsPerPage]);

  const handlePrev = () => setPage((p) => Math.max(0, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  const handleYearSelect = (year: number) => {
    if (disabledFromYear !== undefined && year >= disabledFromYear) {
      return;
    }
    console.log("Selected year:", year);
    updateYear(year);
    onBack();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.arrowRow}>
        <Pressable onPress={handlePrev} disabled={page === 0}>
          <Ionicons name="arrow-back" size={24} color={page === 0 ? "#ccc" : "#222"} />
        </Pressable>

        <Text style={styles.rangeText}>
          {years[0]} - {years[years.length - 1]}
        </Text>

        <Pressable onPress={handleNext} disabled={page === totalPages - 1}>
          <Ionicons
            name="arrow-forward"
            size={24}
            color={page === totalPages - 1 ? "#ccc" : "#222"}
          />
        </Pressable>
      </View>

      {/* Year Grid */}
      <View style={styles.gridContainer}>
        <FlatList
          data={years}
          keyExtractor={(item) => item.toString()}
          numColumns={4}
          renderItem={({ item }) => {
            const disabled = disabledFromYear !== undefined && item >= disabledFromYear;
            const isActive = currentYear === item;
            return (
              <YearItem
                item={item}
                handleYearSelect={handleYearSelect}
                disabled={disabled}
                isActive={isActive}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default Year;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 6,
  },
  arrowRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 12,
  },

  rangeText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  gridContainer: {
    padding: 6,
  },
  yearItemContainer: {
    width: "25%", // 4 columns
    padding: 6, // This creates the gap effect (12px total between items)
  },
  yearButton: {
    backgroundColor: "#ececec",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  yearButtonActive: {
    backgroundColor: "#0466C833",
  },
  yearButtonDisabled: {
    backgroundColor: "#f5f5f5",
  },
  yearText: {
    fontSize: 16,
    color: "#222",
  },
  yearTextActive: {
    color: "#0466C8",
  },
  yearTextDisabled: {
    color: "#aaa",
  },
});

type YearItemProps = {
  item: number;
  handleYearSelect: (year: number) => void;
  disabled: boolean;
  isActive: boolean;
};

const YearItem: React.FC<YearItemProps> = ({
  item,
  handleYearSelect,
  disabled,
  isActive,
}) => {
  return (
    <View style={styles.yearItemContainer}>
      <Pressable
        style={[
          styles.yearButton,
          disabled && styles.yearButtonDisabled,
          isActive && styles.yearButtonActive,
        ]}
        onPress={() => !disabled && handleYearSelect(item)}
        disabled={disabled}
      >
        <Text
          style={[
            styles.yearText,
            disabled && styles.yearTextDisabled,
            isActive && styles.yearTextActive,
          ]}
        >
          {item}
        </Text>
      </Pressable>
    </View>
  );
};
