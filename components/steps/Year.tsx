import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useState, useMemo } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  decrementStep: () => void;
  updateYear: (year: number) => void;
  disabledFromYear?: number;
  currentDate: XDate;
  yearsPerPage?: number;
};

const START_YEAR = 1970;
const END_YEAR = 2100;

const Year: React.FC<Props> = ({
  decrementStep,
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

  const COLUMN_COUNT = 3;

  const years = useMemo(() => {
    // start = 1970 + (10 * 12) = 1970 + 120 = 2090
    // end = 2090 + 12 - 1 = min(2101, 2100) = 2100
    const start = START_YEAR + page * yearsPerPage;

    const end = Math.min(start + yearsPerPage - 1, END_YEAR);

    const data = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const remainder = data.length % COLUMN_COUNT;

    if (remainder !== 0) {
      const padding = Array(COLUMN_COUNT - remainder).fill(null);
      data.push(...padding);
    }

    return data;
  }, [page, yearsPerPage]);

  const handlePrev = () => setPage((p) => Math.max(0, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  const handleYearSelect = (year: number) => {
    if (disabledFromYear !== undefined && year >= disabledFromYear) {
      return;
    }
    updateYear(year);
    decrementStep();
  };

  const validYears = years.filter((y) => y !== null);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable onPress={handlePrev} disabled={page === 0} style={styles.headerArrow}>
          <Ionicons name="arrow-back" size={24} color={page === 0 ? "#ccc" : "#222"} />
        </Pressable>

        <Text style={styles.headerTitle}>
          {validYears[0]} - {validYears[validYears.length - 1]}
        </Text>

        <Pressable
          onPress={handleNext}
          disabled={page === totalPages - 1}
          style={styles.headerArrow}
        >
          <Ionicons
            name="arrow-forward"
            size={24}
            color={page === totalPages - 1 ? "#ccc" : "#222"}
          />
        </Pressable>
      </View>

      {/* Year Grid */}
      <View style={styles.gridContainer}>
        {years.map((item, index) => {
          if (item === null) {
            return <View key={`empty-${index}`} style={styles.yearButton} />;
          }

          const isActive = currentYear === item;
          const disabled = disabledFromYear !== undefined && item >= disabledFromYear;

          return (
            <YearItem
              key={item}
              item={item}
              handleYearSelect={handleYearSelect}
              disabled={disabled}
              isActive={isActive}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Year;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    width: "100%",
  },
  headerArrow: {
    backgroundColor: "#F2F2F5",
    padding: 0,
    width: 36,
    aspectRatio: 1,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "Lato",
    fontWeight: 700,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    paddingTop: 20,
  },
  yearButton: {
    minWidth: 84,
    alignItems: "center",
    padding: 10,
    flex: 1,
    borderRadius: 4,
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
  );
};
